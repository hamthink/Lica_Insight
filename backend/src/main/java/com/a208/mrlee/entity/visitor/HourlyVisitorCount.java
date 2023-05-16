package com.a208.mrlee.entity.visitor;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
@Table(indexes = @Index(name = "idx_date_time", columnList = "dateTime"))
public class HourlyVisitorCount {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private LocalDateTime dateTime;

    @Column(nullable = false)
    private Long numVisitor;

    @Builder
    public HourlyVisitorCount(Long id, LocalDateTime dateTime, Long numVisitor) {

        this.id = id;
        this.dateTime = dateTime;
        this.numVisitor = numVisitor;
    }

    public void setNumVisitor(long numVisitor) {
        this.numVisitor = numVisitor;
    }
}
