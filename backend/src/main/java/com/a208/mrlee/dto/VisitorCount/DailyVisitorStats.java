package com.a208.mrlee.dto.VisitorCount;

import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
public class DailyVisitorStats {

    LocalDate date;
    String weekDay;
    List<HourlyVisitor> dailyStats;

    public DailyVisitorStats(){
        dailyStats = new ArrayList<>();
    }
    public DailyVisitorStats(LocalDate date, List<HourlyVisitor> dailyStats){

        this.date = date;
        this.weekDay = date.getDayOfWeek().name();
        this.dailyStats = dailyStats;
    }

    public void append(HourlyVisitor hourlyVisitor){
        dailyStats.add(hourlyVisitor);
    }
}
