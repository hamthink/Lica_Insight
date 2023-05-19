package com.a208.mrlee.dto.CustomerTrackingInfo;

import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerTrackingInfoDTO {

    private long storeId;
    private String tid;
    private double x;
    private double y;
    private String created; // MQ에서 빼올 때는 datetime 문자열이다

    public static CustomerTrackingInfo of(CustomerTrackingInfoDTO dto){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return CustomerTrackingInfo.builder()
                .storeId(dto.getStoreId())
                .tid(dto.getTid())
                .x(dto.getX())
                .y(dto.getY())
                .created(LocalDateTime.parse(dto.getCreated() , formatter))
                .build();
    }

    public static CustomerTrackingInfoDTO to(CustomerTrackingInfo info){
        return CustomerTrackingInfoDTO.builder()
                .storeId(info.getStoreId())
                .tid(info.getTid())
                .x(info.getX())
                .y(info.getY())
                .created(info.getCreated().toString())
                .build();
    }

    public static CustomerTrackingInfoDTO copyFromEntity(CustomerTrackingInfo info){
        return CustomerTrackingInfoDTO.builder()
                .storeId(info.getStoreId())
                .tid(info.getTid())
                .x(info.getX())
                .y(info.getY())
                .created(info.getCreated().toString())
                .build();
    }
}
