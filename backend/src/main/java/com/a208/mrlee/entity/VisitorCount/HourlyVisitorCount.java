package com.a208.mrlee.entity.VisitorCount;

import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
public class HourlyVisitorCount implements VisitorCount{

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private LocalDateTime datetime;

    @Column(nullable = false)
    private Long numVisitor;

    @Builder
    public HourlyVisitorCount(Long id, LocalDateTime datetime, Long numVisitor) {

        this.id = id;
        this.datetime = datetime;
        this.numVisitor = numVisitor;
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    @Override
    public Long getNumVisitor() {
        return numVisitor;
    }

    @Override
    public void setNumVisitor(long numVisitor) {
        this.numVisitor = numVisitor;
    }
}
