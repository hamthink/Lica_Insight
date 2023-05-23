import pika
from pika.exceptions import AMQPConnectionError
import json
import numpy as np
import cv2
import base64
import sys
import time
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

CAM_UPTIME = int(os.getenv('CAM_UPTIME'))
CAM_UPTIME += 1
os.environ['CAM_UPTIME'] = str(CAM_UPTIME)
print("cam_uptime =", CAM_UPTIME)

with open(dotenv_path, 'w') as f:
	f.write(f"CAM_UPTIME={CAM_UPTIME}\n")

cap=cv2.VideoCapture(0)
video_width = 960
cap.set(3, video_width)

video_height = 540
cap.set(4, video_height)

credentials = pika.PlainCredentials('a208', 'a208!')
parameters = pika.ConnectionParameters(host='70.12.247.39', credentials=credentials)

connection = None
try:
	connection = pika.BlockingConnection(parameters)
except AMQPConnectionError as e:
	print(repr(e))
	sys.exit(1)
	
topic = "TrackingPlane"
channel = connection.channel()

channel.queue_declare(queue=topic)

prev_time = 0
fps = 5

while True:
	ret, frame = cap.read()

	dt = time.time() - prev_time
	
	if (ret is True) and (dt > 1./fps):
		prev_time = time.time()
		
		_, new_frame = cv2.imencode(".jpg", frame)
		frame_data = new_frame.tobytes()
		encoded_data = base64.b64encode(frame_data)
		
		data = {"frame": encoded_data.decode('utf-8'),
				"width": video_width,
				"height": video_height,
				"store_id":1,
				"cam_uptime":CAM_UPTIME}
		message = json.dumps(data)
		channel.basic_publish(exchange='', routing_key=topic, body=message)
		cv2.imshow("video", frame)
		
	if cv2.waitKey(1) & 0xff == ord('q'):
		break
	
print("publish end")
print("close rabbitmq connection")                                                                                                                                                                       
connection.close()
