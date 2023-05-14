package com.a208.mrlee.dto.DailyVisitorCount;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
public class DailyVisitorCountDto {

    private Long id;
    private LocalDate date;
    private Long numVisitor;

    @Builder
    public DailyVisitorCountDto(Long id, LocalDate date, Long numVisitor){

        this.id = id;
        this.date = date;
        this.numVisitor = numVisitor;
    }
}
