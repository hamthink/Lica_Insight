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
    String time;
    Long visitors;

    private String getFormattedTime(LocalTime time){
        return time.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
    public HourlyVisitor(LocalDateTime datetime, Long visitors) {

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
    public HourlyVisitor(LocalTime time, Long visitors) {

        this.time = getFormattedTime(time);
        this.visitors = visitors;
    }

}
