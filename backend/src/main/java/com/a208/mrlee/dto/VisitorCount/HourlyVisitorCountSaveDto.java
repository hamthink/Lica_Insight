package com.a208.mrlee.dto.VisitorCount;

import com.a208.mrlee.entity.visitor.HourlyVisitorCount;
import lombok.Builder;
import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalDateTime;

@Getter
public class HourlyVisitorCountSaveDto {

    private LocalDateTime dateTime;

    private Long numVisitor;

    @Builder
    public HourlyVisitorCountSaveDto(LocalDateTime dateTime, Long numVisitor) {

        this.dateTime = dateTime;
        this.numVisitor = numVisitor;
    }

    public HourlyVisitorCount toEntity(){

        return HourlyVisitorCount.builder()
                .dateTime(dateTime)
                .numVisitor(numVisitor)
                .build();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.JSON_STYLE)
                .append("dateTime", dateTime)
                .append("numVisitor", numVisitor)
                .toString();
    }
}
