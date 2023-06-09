package com.a208.mrlee.service.visit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.dto.CustomerTrackingInfo.TrackXYDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface VisitService {
    List<CustomerTrackingInfoDTO> getTrackingInfo(LocalDateTime start , LocalDateTime end);
    Map<String , List<TrackXYDTO>> getTrack(LocalDateTime start , LocalDateTime end);

    Map<String, List<TrackXYDTO>> getFilteredTrackingInfo(LocalDateTime start, LocalDateTime end);
}
