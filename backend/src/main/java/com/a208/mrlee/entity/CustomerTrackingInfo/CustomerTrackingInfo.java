package com.a208.mrlee.entity.CustomerTrackingInfo;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Date;

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

    @JsonIgnore
    @Column(name="tracking_img")
    private String img;

    @Column(nullable = false ,name = "tracking_pos3d")
    private String pos3d;
}
