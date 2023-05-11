package com.a208.mrlee.component.rabbit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDateTime;

@Component
public class RabbitComponent {

    @Autowired
    private CustomerTrackingInfoRepository customerTrackingInfoRepository;


    @RabbitListener(queues = "${spring.rabbitmq.queue}")
    public void receiveInfo(CustomerTrackingInfoDTO dto){

//        System.out.println(dto);
//
//        dto.setCreated(LocalDateTime.now());
//        customerTrackingInfoRepository.save(CustomerTrackingInfoDTO.of(dto));

    }
}
