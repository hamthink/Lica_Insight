package com.a208.mrlee.dto.VisitorCount;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor
@Getter
public class HourlyVisitor {

    LocalDate date;
    String weekDay;
    LocalTime time;
    Long visitors;

    public HourlyVisitor(LocalDateTime datetime, Long visitors){

        this.date = datetime.toLocalDate();
        this.weekDay = date.getDayOfWeek().name();
        this.time = datetime.toLocalTime();
        this.visitors = visitors;
    }

    @Builder
    public HourlyVisitor(LocalDate date, LocalTime time, Long visitors){

        this.date = date;
        this.weekDay = date.getDayOfWeek().name();
        this.time = time;
        this.visitors = visitors;
    }

}
