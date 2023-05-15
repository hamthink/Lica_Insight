package com.a208.mrlee.entity.VisitorCount;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Entity
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
