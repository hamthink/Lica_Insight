package com.a208.mrlee.dto.VisitorCount;

import com.a208.mrlee.entity.VisitorCount.HourlyVisitorCount;
import com.a208.mrlee.repository.VisitorCount.HourlyVisitorCountRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class HourlyVisitorCountDto {

    Long id;
    LocalDateTime dateTime;
    Long numVisitor;

    @Builder
    public HourlyVisitorCountDto(Long id, LocalDateTime dateTime, Long numVisitor){

        this.id = id;
        this.dateTime = dateTime;
        this.numVisitor = numVisitor;
    }

    public static HourlyVisitorCountDto fromEntity(HourlyVisitorCount entity){
        return new HourlyVisitorCountDto(
                entity.getId(),
                entity.getDateTime(),
                entity.getNumVisitor()
        );
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.JSON_STYLE)
                .append("id", id)
                .append("dateTime", dateTime)
                .append("numVisitor", numVisitor)
                .toString();
    }
}
