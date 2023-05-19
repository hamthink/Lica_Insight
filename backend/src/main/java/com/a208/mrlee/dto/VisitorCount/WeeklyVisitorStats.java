package com.a208.mrlee.dto.VisitorCount;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class WeeklyVisitorStats {
    private List<DailyVisitor> weeklyStats;

    public WeeklyVisitorStats() {
        weeklyStats = new ArrayList<>();
    }

    public WeeklyVisitorStats(List<DailyVisitor> weeklyStats) {

        this.weeklyStats = weeklyStats;
    }

    public void append(DailyVisitor dailyVisitor) {
        weeklyStats.add(dailyVisitor);
    }

    public void sortByDate() {
        weeklyStats = weeklyStats.stream()
                .sorted(Comparator.comparing(DailyVisitor::getDate))
                .collect(Collectors.toList());
    }
}
