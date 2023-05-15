package com.a208.mrlee.dto.CustomerTrackingInfo;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TrackXYDTO {
    private double x;
    private double y;

    public static TrackXYDTO to(CustomerTrackingInfoDTO info){
        return TrackXYDTO.builder()
                .x(info.getX())
                .y(info.getY())
                .build();
    }
}
