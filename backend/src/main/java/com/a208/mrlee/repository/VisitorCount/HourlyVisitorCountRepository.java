package com.a208.mrlee.repository.VisitorCount;

import com.a208.mrlee.entity.visitor.HourlyVisitorCount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface HourlyVisitorCountRepository extends JpaRepository<HourlyVisitorCount, Long> {

    Optional<HourlyVisitorCount> findByDateTime(LocalDateTime dateTime);

    boolean existsByDateTime(LocalDateTime dateTime);
}
