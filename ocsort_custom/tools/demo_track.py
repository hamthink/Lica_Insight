import argparse
import os
import os.path as osp
import queue
import sys
from threading import Thread, Event
import time
from time import mktime
from datetime import datetime
import cv2
import numpy as np
import pika
from pika.exceptions import AMQPConnectionError, ReentrancyError, ChannelClosed
from dotenv import dotenv_values
import torch
import json
import base64

from loguru import logger

from yolox.data.data_augment import preproc
from yolox.exp import get_exp
from yolox.utils import fuse_model, get_model_info, postprocess
from yolox.utils.visualize import plot_tracking
from trackers.ocsort_tracker.ocsort import OCSort
from trackers.tracking_utils.timer import Timer
from utils.args import make_parser
from pixel_world_mapper import PixelWorldCoordinateMapper

IMAGE_EXT = [".jpg", ".jpeg", ".webp", ".bmp", ".png"]


class Predictor(object):
    def __init__(
            self,
            model,
            exp,
            trt_file=None,
            decoder=None,
            device=torch.device("cpu"),
            fp16=False
    ):
        self.model = model
        self.decoder = decoder
        self.num_classes = exp.num_classes
        self.confthre = exp.test_conf
        self.nmsthre = exp.nmsthre
        self.test_size = exp.test_size
        self.device = device
        self.fp16 = fp16
        if trt_file is not None:
            from torch2trt import TRTModule

            model_trt = TRTModule()
            model_trt.load_state_dict(torch.load(trt_file))

            x = torch.ones((1, 3, exp.test_size[0], exp.test_size[1]), device=device)
            self.model(x)
            self.model = model_trt
        self.rgb_means = (0.485, 0.456, 0.406)
        self.std = (0.229, 0.224, 0.225)

    def inference(self, img, timer):
        img_info = {"id": 0}
        if isinstance(img, str):
            img_info["file_name"] = osp.basename(img)
            img = cv2.imread(img)
        else:
            img_info["file_name"] = None

        height, width = img.shape[:2]
        img_info["height"] = height
        img_info["width"] = width
        img_info["raw_img"] = img

        img, ratio = preproc(img, self.test_size, self.rgb_means, self.std)
        img_info["ratio"] = ratio
        img = torch.from_numpy(img).unsqueeze(0).float().to(self.device)
        if self.fp16:
            img = img.half()  # to FP16

        with torch.no_grad():
            timer.tic()
            outputs = self.model(img)
            if self.decoder is not None:
                outputs = self.decoder(outputs, dtype=outputs.type())
            outputs = postprocess(
                outputs, self.num_classes, self.confthre, self.nmsthre
            )
        return outputs, img_info


# global variables
received_images = queue.Queue()
rabbitmq_consumer_tag: str
stop_consuming: bool = False
config = dotenv_values(".env")


def on_message(ch, method, properties, body):
    global rabbitmq_consumer_tag
    global stop_consuming

    if stop_consuming:
        logger.info('stop consuming')
        ch.basic_cancel(rabbitmq_consumer_tag)

    data = json.loads(body)

    store_id = data['store_id']

    cam_uptime = data['cam_uptime']

    frame_data = base64.b64decode(data['frame'].encode('utf-8'))  # bytes
    frame_ndarray = np.frombuffer(frame_data, dtype=np.uint8)
    frame = cv2.imdecode(frame_ndarray, cv2.IMREAD_COLOR)

    created = datetime.fromtimestamp(
        mktime(
            time.localtime(
                properties.timestamp
            )
        )
    )

    entry = {
        'store_id': store_id,
        'frame': frame,
        'created': str(created),
        'cam_uptime': cam_uptime
    }

    received_images.put(entry)  # 전역 이미지 큐에 frame put


def consume_rabbitmq_message():
    global rabbitmq_consumer_tag
    rabbitmq_user = config.get("RABBITMQ_DEFAULT_USER")
    rabbitmq_pass = config.get("RABBITMQ_DEFAULT_PASS")
    credentials = pika.PlainCredentials(rabbitmq_user, rabbitmq_pass)

    rabbitmq_host = config.get("RABBITMQ_SRC_HOST")
    connection_params = pika.ConnectionParameters(
        host=rabbitmq_host,
        credentials=credentials
    )

    topic = config.get("SRC_QUEUE_NAME")
    rabbitmq_connection = None
    try:
        logger.info("try to connect to RabbitMQ...")
        rabbitmq_connection = pika.BlockingConnection(connection_params)
        logger.info("connect success")

        channel = rabbitmq_connection.channel()
        rabbitmq_consumer_tag = channel.basic_consume(queue=topic,
                                                      on_message_callback=on_message,
                                                      auto_ack=True)
        logger.info(f"start consuming. consumer-tag={rabbitmq_consumer_tag}")
        channel.start_consuming()
        logger.info("consuming end")
    except AMQPConnectionError as e:
        logger.error(repr(e))
    except ReentrancyError as e:
        logger.error(repr(e))
    except ChannelClosed as e:
        logger.error(repr(e))
    finally:
        if rabbitmq_connection is not None:
            rabbitmq_connection.close()
            logger.info("connection closed")
        logger.info("consumer terminated")


consumer = Thread(target=consume_rabbitmq_message)


def get_bottom_center(top, left, width, height):
    x = left + width / 2
    y = top + height
    return x, y


def custom_imageflow_demo(predictor, args):
    global stop_consuming

    # RabbitMQ 연결. 이 연결 성공시 프레임 마다 추출된 고객 동선 데이터를 전송한다.
    rabbitmq_user = config.get("RABBITMQ_DEFAULT_USER")
    rabbitmq_pass = config.get("RABBITMQ_DEFAULT_PASS")
    credentials = pika.PlainCredentials(rabbitmq_user, rabbitmq_pass)

    rabbitmq_host = config.get("RABBITMQ_DEST_HOST")
    connection_params = pika.ConnectionParameters(
        host=rabbitmq_host,
        port=3333,
        credentials=credentials
    )

    topic = config.get("DEST_QUEUE_NAME")
    logger.info(f"try to connect to {rabbitmq_host}...")
    rabbitmq_connection = pika.BlockingConnection(connection_params)
    logger.info("connect success")

    publish_channel = rabbitmq_connection.channel()
    publish_channel.queue_declare(queue=topic)
    # RabbitMQ Channel 준비 완료

    logger.info("initialize tracker(OCSort)")
    tracker = OCSort(det_thresh=args.track_thresh, iou_threshold=args.iou_thresh, use_byte=args.use_byte)
    logger.info("tracker ready")

    timer = Timer()
    frame_id = 0

    logger.info("start polling image frame and apply ocsort")

    pixel_world_point_mapper = PixelWorldCoordinateMapper()
    pixel_world_point_mapper.set_base_world_coordinate()

    while True:
        if not consumer.is_alive():
            logger.info("consumer dead")
            break

        ch = cv2.waitKey(1)
        if ch == 27 or ch == ord("q") or ch == ord("Q"):
            break

        if received_images.empty():
            continue

        entry = received_images.get()

        store_id = entry['store_id']
        frame = entry['frame']
        created = entry['created']
        cam_uptime = entry['cam_uptime']

        if frame_id % 20 == 0:
            logger.info('Processing frame {} ({:.2f} fps)'.format(frame_id, 1. / max(1e-5, timer.average_time)))

        outputs, img_info = predictor.inference(frame, timer)
        if outputs[0] is not None:
            online_targets = tracker.update(outputs[0], [img_info['height'], img_info['width']], exp.test_size)
            online_tlwhs = []  # 한 루프에서 추적된 오브젝트 tlwh
            online_ids = []  # 한 루프에서 추적된 오브젝트 id
            for t in online_targets:
                tlwh = [t[0], t[1], t[2] - t[0], t[3] - t[1]]
                tid = t[4]

                vertical = tlwh[2] / tlwh[3] > args.aspect_ratio_thresh
                if tlwh[2] * tlwh[3] > args.min_box_area and not vertical:
                    online_tlwhs.append(tlwh)
                    online_ids.append(tid)

                    x, y = get_bottom_center(tlwh[1], tlwh[0], tlwh[2], tlwh[3])

                    wx, wy = pixel_world_point_mapper.pixel_to_world(x, y)

                    wx = max(round(wx, 3), 0.0)
                    wy = max(round(wy, 3), 0.0)

                    uptime_tid = f"{cam_uptime}_{int(tid)}"
                    customer_tracking_info = {'storeId': store_id, 'tid': uptime_tid, 'x': wx, 'y': wy, 'created': created}

                    message = json.dumps(customer_tracking_info)
                    publish_channel.basic_publish(exchange='', routing_key=topic, body=message)

            timer.toc()
            # online_im: 최종적으로 추적된 tid, tlwh 를 화면에 그리기 위한 정보
            online_im = plot_tracking(
                img_info['raw_img'], online_tlwhs, online_ids, frame_id=frame_id + 1, fps=1. / timer.average_time
            )
        else:
            timer.toc()
            online_im = img_info['raw_img']

        cv2.imshow('online image', online_im)

        frame_id += 1

    stop_consuming = True
    cv2.destroyAllWindows()
    rabbitmq_connection.close()
    logger.info("custom imageflow demo end")


def main(exp, args):
    if not args.expn:
        args.expn = exp.exp_name

    output_dir = osp.join(exp.output_dir, args.expn)
    os.makedirs(output_dir, exist_ok=True)

    if args.save_result:
        vis_folder = osp.join(output_dir, "track_vis")
        os.makedirs(vis_folder, exist_ok=True)

    if args.trt:
        args.device = "gpu"
    args.device = torch.device("cuda" if args.device == "gpu" else "cpu")

    logger.info("Args: {}".format(args))

    if args.conf is not None:
        exp.test_conf = args.conf
    if args.nms is not None:
        exp.nmsthre = args.nms
    if args.tsize is not None:
        exp.test_size = (args.tsize, args.tsize)

    model = exp.get_model().to(args.device)
    logger.info("Model Summary: {}".format(get_model_info(model, exp.test_size)))
    model.eval()

    if not args.trt:
        if args.ckpt is None:
            ckpt_file = osp.join(output_dir, "best_ckpt.pth.tar")
        else:
            ckpt_file = args.ckpt
        logger.info("loading checkpoint")
        ckpt = torch.load(ckpt_file, map_location="cpu")
        # load the model state dict
        model.load_state_dict(ckpt["model"])
        logger.info("loaded checkpoint done.")

    if args.fuse:
        logger.info("\tFusing model...")
        model = fuse_model(model)

    if args.fp16:
        model = model.half()  # to FP16

    if args.trt:
        assert not args.fuse, "TensorRT model is not support model fusing!"
        trt_file = osp.join(output_dir, "model_trt.pth")
        assert osp.exists(
            trt_file
        ), "TensorRT model is not found!\n Run python3 tools/trt.py first!"
        model.head.decode_in_inference = False
        decoder = model.head.decode_outputs
        logger.info("Using TensorRT to inference")
    else:
        trt_file = None
        decoder = None

    predictor = Predictor(model, exp, trt_file, decoder, args.device, args.fp16)
    custom_imageflow_demo(predictor, args)


if __name__ == "__main__":
    consumer.start()

    args = make_parser().parse_args()
    exp = get_exp(args.exp_file, args.name)
    main(exp, args)

    logger.info("custom imageflow demo end")
