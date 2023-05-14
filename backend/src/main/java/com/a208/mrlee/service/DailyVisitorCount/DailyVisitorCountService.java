package com.a208.mrlee.service.DailyVisitorCount;

import com.a208.mrlee.dto.DailyVisitorCount.DailyVisitorCountDto;
import com.a208.mrlee.dto.DailyVisitorCount.DailyVisitorCountSaveDto;
import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import com.a208.mrlee.entity.VisitorCount.DailyVisitorCount;
import com.a208.mrlee.exception.DateAlreadyExistException;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import com.a208.mrlee.repository.DailyVisitorCount.DailyVisitorCountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Transactional
@Service
public class DailyVisitorCountService {

    private final DailyVisitorCountRepository dailyVisitorCountRepository;
    private final CustomerTrackingInfoRepository customerTrackingInfoRepository;

    public DailyVisitorCountDto create(DailyVisitorCountSaveDto dto) {

        if (dailyVisitorCountRepository.existsByDate(dto.getDate())) {
            throw new DateAlreadyExistException();
        }

        DailyVisitorCount dailyVisitorCount = dailyVisitorCountRepository.save(dto.toEntity());

        return DailyVisitorCountDto.builder()
                .id(dailyVisitorCount.getId())
                .date(dailyVisitorCount.getDate())
                .numVisitor(dailyVisitorCount.getNumVisitor())
                .build();
    }

    public DailyVisitorCountDto create(LocalDate date) {

        if (dailyVisitorCountRepository.existsByDate(date)) {
            throw new DateAlreadyExistException();
        }

        long numVisitor = countVisitors(date);

        DailyVisitorCount entity = DailyVisitorCount
                .builder()
                .date(date)
                .numVisitor(numVisitor)
                .build();

        DailyVisitorCount saved = dailyVisitorCountRepository.save(entity);

        return DailyVisitorCountDto
                .builder()
                .id(saved.getId())
                .date(saved.getDate())
                .numVisitor(saved.getNumVisitor())
                .build();
    }

    public Long countVisitors(LocalDate date) {

        LocalDateTime start = LocalDateTime.of(
                date,
                LocalTime.of(0, 0, 0)
        );

        LocalDateTime end = LocalDateTime.of(
                date,
                LocalTime.of(23, 59, 59)
        );

        long numVisitor = customerTrackingInfoRepository.findByCreatedBetween(start, end)
                .stream()
                .map(CustomerTrackingInfo::getTid)
                .distinct()
                .count();

        return numVisitor;
    }

    public DailyVisitorCountDto findByDate(LocalDate date) {

        DailyVisitorCount dailyVisitorCount = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(() -> new NoSuchElementException());

        return DailyVisitorCountDto.builder()
                .id(dailyVisitorCount.getId())
                .date(dailyVisitorCount.getDate())
                .numVisitor(dailyVisitorCount.getNumVisitor())
                .build();
    }

    public Long deleteByDate(LocalDate date) {

        DailyVisitorCount evictor = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(NoSuchElementException::new);

        Long evictorId = evictor.getId();

        dailyVisitorCountRepository.deleteById(evictorId);

        return evictorId;
    }

    public DailyVisitorCountDto updateNumVisitorOfDate(LocalDate date, Long newNumVisitor) {

        DailyVisitorCount dailyVisitorCount = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(() -> new NoSuchElementException());

        dailyVisitorCount.setNumVisitor(newNumVisitor);

        return DailyVisitorCountDto.builder()
                .id(dailyVisitorCount.getId())
                .date(dailyVisitorCount.getDate())
                .numVisitor(dailyVisitorCount.getNumVisitor())
                .build();
    }

    public Long getNumVisitorOfDate(LocalDate date) {
        DailyVisitorCount dailyVisitorCount = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(() -> new NoSuchElementException());

        return dailyVisitorCount.getNumVisitor();
    }
}
