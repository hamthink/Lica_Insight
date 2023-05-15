package com.a208.mrlee.dto.VisitorCount;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@NoArgsConstructor
@Getter
public class HourlyVisitor {
    LocalDate date;
    String weekDay;
    String time;
    Long visitors;

    private String getFormattedTime(LocalTime time){
        return time.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
    public HourlyVisitor(LocalDateTime datetime, Long visitors) {

        this.date = datetime.toLocalDate();
        this.weekDay = date.getDayOfWeek().name();
        this.time = getFormattedTime(
                LocalTime.of(
                        datetime.getHour(),
                        datetime.getMinute(),
                        datetime.getSecond()
                )
        );
        this.visitors = visitors;
    }

    @Builder
    public HourlyVisitor(LocalDate date, LocalTime time, Long visitors) {

        this.date = date;
        this.weekDay = date.getDayOfWeek().name();
        this.time = getFormattedTime(time);
        this.visitors = visitors;
    }

}
