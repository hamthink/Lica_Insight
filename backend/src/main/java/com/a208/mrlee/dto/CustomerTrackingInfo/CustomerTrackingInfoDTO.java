package com.a208.mrlee.dto.CustomerTrackingInfo;

import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import lombok.*;

import java.time.LocalDateTime;

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
    private LocalDateTime created;

    public static CustomerTrackingInfo of(CustomerTrackingInfoDTO dto){
        return CustomerTrackingInfo.builder()
                .storeId(dto.getStoreId())
                .tid(dto.getTid())
                .x(dto.getX())
                .y(dto.getY())
                .created(dto.getCreated())
                .build();
    }

    public static CustomerTrackingInfoDTO to(CustomerTrackingInfo info){
        return CustomerTrackingInfoDTO.builder()
                .storeId(info.getStoreId())
                .tid(info.getTid())
                .x(info.getX())
                .y(info.getY())
                .created(info.getCreated())
                .build();
    }
}
