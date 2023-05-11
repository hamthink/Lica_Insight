package com.a208.mrlee.dto.CustomerTrackingInfo;

import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import lombok.*;

import java.sql.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerTrackingInfoDTO {



    private Long id;
    private String img;
    private String pos3d;



    public static CustomerTrackingInfo of(CustomerTrackingInfoDTO dto){
        return CustomerTrackingInfo.builder()
                .id(dto.getId())
                .img(dto.getImg())
                .pos3d(dto.getPos3d())
                .build();
    }

//    private long storeId;
//    private long tid;
//    private double x;
//    private double y;
//    private Date created;
}
