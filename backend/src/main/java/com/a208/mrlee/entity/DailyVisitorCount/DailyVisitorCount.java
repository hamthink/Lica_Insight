package com.a208.mrlee.entity.DailyVisitorCount;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
public class DailyVisitorCount {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private LocalDate date;

    @Column
    private Integer numVisitor;

}
