package com.a208.mrlee.dto.VisitorCount;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
public class DailyVisitor {

    LocalDate date;
    String weekDay;
    Long visitors;

    @Builder
    public DailyVisitor(LocalDate date, Long visitors) {
        this.date = date;
        this.weekDay = date.getDayOfWeek().name();
        this.visitors = visitors;
    }
}
