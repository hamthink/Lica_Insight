package com.a208.mrlee.component.rabbit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitComponent {

    @Autowired
    private CustomerTrackingInfoRepository customerTrackingInfoRepository;


    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receiveInfo(CustomerTrackingInfoDTO dto){
        customerTrackingInfoRepository.save(CustomerTrackingInfoDTO.of(dto));
    }
}
