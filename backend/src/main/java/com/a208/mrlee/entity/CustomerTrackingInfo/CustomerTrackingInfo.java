package com.a208.mrlee.entity.CustomerTrackingInfo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "CustomerTrackingInfo")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CustomerTrackingInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tracking_idx")
    private Long id;

    @Column(name = "tracking_storeId")
    private long storeId;

    @Column(name = "tracking_tid")
    private String tid;

    @Column(name = "tracking_x")
    private double x;

    @Column(name = "tracking_y")
    private double y;

    @Column(name = "tracking_created")
    private LocalDateTime created;
}
