package com.a208.mrlee.repository.CustomerTrackingInfo;

import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

public interface CustomerTrackingInfoRepository extends JpaRepository<CustomerTrackingInfo, Long> {
//    Optional<List<CustomerTrackingInfo>> findByCreatedBetween(Date start, Date end);
}
