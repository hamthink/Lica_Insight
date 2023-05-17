package com.a208.mrlee.service.visit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.dto.CustomerTrackingInfo.TrackXYDTO;
import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisitServiceImpl implements VisitService {

    private final CustomerTrackingInfoRepository customerTrackingInfoRepository;

    @Override
    public List<CustomerTrackingInfoDTO> getTrackingInfo(LocalDateTime start, LocalDateTime end) {
        List<CustomerTrackingInfo> list = customerTrackingInfoRepository
                .findByCreatedBetween(start, end);
        return list.stream()
                .map(m -> CustomerTrackingInfoDTO.to(m))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, List<TrackXYDTO>> getTrack(LocalDateTime start, LocalDateTime end) {
        List<CustomerTrackingInfoDTO> list = customerTrackingInfoRepository
                .findByCreatedBetween(start, end)
                .stream()
                .map(m -> CustomerTrackingInfoDTO.to(m))
                .sorted(Comparator.comparing(CustomerTrackingInfoDTO::getTid))
                .collect(Collectors.toList());

        Map<String, List<TrackXYDTO>> result = new HashMap<>();

        for (CustomerTrackingInfoDTO dto : list) {
            TrackXYDTO track = TrackXYDTO.to(dto);
            result.computeIfAbsent(dto.getTid(), k -> new ArrayList<>()).add(track);
        }

        return result;
    }

    @Override
    public Map<String, List<TrackXYDTO>> getFilteredTrackingInfo(LocalDateTime start, LocalDateTime end) {

        final double MIN_MAGNITUDE_THRESHOLD = 500 * 500;
        final int MIN_STEP_COUNT_THRESHOLD = 2;

        List<CustomerTrackingInfoDTO> customerTrackingInfoDTOList
                = customerTrackingInfoRepository.findByCreatedBetween(start, end)
                .stream()
                .map(CustomerTrackingInfoDTO::copyFromEntity)
                .collect(Collectors.toList());

        Map<String, List<TrackXYDTO>> afterMagnitudeFiltering = new HashMap<>();

        for (CustomerTrackingInfoDTO dto : customerTrackingInfoDTOList) {

            String tid = dto.getTid();

            TrackXYDTO xy = TrackXYDTO.builder()
                    .x(dto.getX())
                    .y(dto.getY())
                    .build();

            List<TrackXYDTO> v = afterMagnitudeFiltering.computeIfAbsent(tid, k -> new ArrayList<>());
            if (v.isEmpty() || (TrackXYDTO.getMagnitude(v.get(v.size() - 1), xy) >= MIN_MAGNITUDE_THRESHOLD)) {
                v.add(xy);
            }
        }

        Map<String, List<TrackXYDTO>> afterStepCountFiltering = afterMagnitudeFiltering.entrySet()
                .stream()
                .filter(entry -> entry.getValue().size() >= MIN_STEP_COUNT_THRESHOLD)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        return afterStepCountFiltering;
    }
}


