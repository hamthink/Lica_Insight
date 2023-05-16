package com.a208.mrlee.dto.VisitorCount;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DailyVisitorStats {

    List<HourlyVisitor> dailyStats;

    public DailyVisitorStats(){
        dailyStats = new ArrayList<>();
    }
    public DailyVisitorStats(List<HourlyVisitor> dailyStats){
        this.dailyStats = dailyStats;
    }

    public void append(HourlyVisitor hourlyVisitor){
        dailyStats.add(hourlyVisitor);
    }
}
