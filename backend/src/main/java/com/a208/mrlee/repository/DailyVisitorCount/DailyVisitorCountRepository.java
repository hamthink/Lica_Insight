package com.a208.mrlee.repository.DailyVisitorCount;

import com.a208.mrlee.entity.VisitorCount.DailyVisitorCount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DailyVisitorCountRepository extends JpaRepository<DailyVisitorCount, Long> {

    Optional<DailyVisitorCount> findByDate(LocalDate date);
    boolean existsByDate(LocalDate date);
}
