package com.a208.mrlee.dto.DailyVisitorCount;

import com.a208.mrlee.entity.VisitorCount.DailyVisitorCount;
import lombok.Builder;
import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalDate;

@Getter
public class DailyVisitorCountSaveDto {

    private LocalDate date;

    private Long numVisitor;

    @Builder
    public DailyVisitorCountSaveDto(LocalDate date, Long numVisitor) {

        this.date = date;
        this.numVisitor = numVisitor;
    }

    public DailyVisitorCount toEntity(){

        return DailyVisitorCount.builder()
                .date(date)
                .numVisitor(numVisitor)
                .build();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.JSON_STYLE)
                .append("date", date)
                .append("numVisitor", numVisitor)
                .toString();
    }
}
