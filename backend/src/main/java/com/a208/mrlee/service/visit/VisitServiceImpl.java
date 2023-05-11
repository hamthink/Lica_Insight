package com.a208.mrlee.service.visit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisitServiceImpl implements VisitService{

    private final CustomerTrackingInfoRepository customerTrackingInfoRepository;
    @Override
    public List<CustomerTrackingInfoDTO> getTrackingInfo(LocalDateTime start, LocalDateTime end) {
        List<CustomerTrackingInfo> list = customerTrackingInfoRepository
                .findByCreatedBetween(start , end).orElse(null);
        return list.stream()
                .map(m->CustomerTrackingInfoDTO.to(m))
                .collect(Collectors.toList());
    }

    @Override
    public  Map<String , List<CustomerTrackingInfoDTO>> getTrack(LocalDateTime start, LocalDateTime end) {
        List<CustomerTrackingInfoDTO> list = customerTrackingInfoRepository
                .findByCreatedBetween(start , end).orElse(null)
                .stream()
                .map(m->CustomerTrackingInfoDTO.to(m))
                .collect(Collectors.toList());

        return list.stream()
                .sorted(Comparator.comparing(CustomerTrackingInfoDTO::getTid))
                .collect(Collectors.groupingBy(CustomerTrackingInfoDTO::getTid));
    }
}
