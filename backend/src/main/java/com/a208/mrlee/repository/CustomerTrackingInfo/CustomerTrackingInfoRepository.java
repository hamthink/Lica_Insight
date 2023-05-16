package com.a208.mrlee.repository.CustomerTrackingInfo;

import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CustomerTrackingInfoRepository extends JpaRepository<CustomerTrackingInfo, Long> {
    List<CustomerTrackingInfo> findByCreatedBetween(LocalDateTime start, LocalDateTime end);

    List<CustomerTrackingInfo> findByCreatedBetweenAndOrderByCreatedAsc(LocalDateTime start, LocalDateTime end);
}
