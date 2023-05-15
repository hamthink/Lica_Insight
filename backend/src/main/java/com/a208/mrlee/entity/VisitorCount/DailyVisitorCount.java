package com.a208.mrlee.entity.VisitorCount;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Entity
@Table(indexes = @Index(name = "idx_date", columnList = "date"))
public class DailyVisitorCount {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true, nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Long numVisitor;

    @Builder
    public DailyVisitorCount(Long id, LocalDate date, Long numVisitor) {

        this.id = id;
        this.date = date;
        this.numVisitor = numVisitor;
    }

    public void setNumVisitor(long numVisitor) {
        this.numVisitor = numVisitor;
    }
}
