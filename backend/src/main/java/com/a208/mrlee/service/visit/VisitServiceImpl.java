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
public class VisitServiceImpl implements VisitService{

    private final CustomerTrackingInfoRepository customerTrackingInfoRepository;
    @Override
    public List<CustomerTrackingInfoDTO> getTrackingInfo(LocalDateTime start, LocalDateTime end) {
        List<CustomerTrackingInfo> list = customerTrackingInfoRepository
                .findByCreatedBetween(start , end);
        return list.stream()
                .map(m->CustomerTrackingInfoDTO.to(m))
                .collect(Collectors.toList());
    }

    @Override
    public  Map<String , List<TrackXYDTO>> getTrack(LocalDateTime start, LocalDateTime end) {
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
}


