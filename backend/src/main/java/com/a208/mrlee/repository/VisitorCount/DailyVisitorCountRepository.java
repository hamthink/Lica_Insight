package com.a208.mrlee.repository.VisitorCount;

import com.a208.mrlee.entity.visitor.DailyVisitorCount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyVisitorCountRepository extends JpaRepository<DailyVisitorCount, Long> {

    Optional<DailyVisitorCount> findByDate(LocalDate date);
    boolean existsByDate(LocalDate date);
}
