package com.a208.mrlee.dto.VisitorCount;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.util.List;

@NoArgsConstructor
@Getter
public class HourlyVisitorCountDtos {
    List<HourlyVisitorCountDto> hourlyVisitorList;

    public HourlyVisitorCountDtos(List<HourlyVisitorCountDto> hourlyVisitorList){
        this.hourlyVisitorList = hourlyVisitorList;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.JSON_STYLE)
                .append("hourlyVisitorList", hourlyVisitorList)
                .toString();
    }
}
