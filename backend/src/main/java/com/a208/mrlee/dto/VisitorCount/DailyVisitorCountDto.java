package com.a208.mrlee.dto.VisitorCount;

import com.a208.mrlee.entity.VisitorCount.DailyVisitorCount;
import lombok.Builder;
import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

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

    public static DailyVisitorCountDto fromEntity(DailyVisitorCount entity){

        return new DailyVisitorCountDto(
                entity.getId(),
                entity.getDate(),
                entity.getNumVisitor()
        );
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.JSON_STYLE)
                .append("id", id)
                .append("date", date)
                .append("numVisitor", numVisitor)
                .toString();
    }
}
