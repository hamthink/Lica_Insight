package com.a208.mrlee.service.VisitorCount;

import com.a208.mrlee.dto.VisitorCount.DailyVisitorCountDto;
import com.a208.mrlee.dto.VisitorCount.DailyVisitorCountSaveDto;
import com.a208.mrlee.dto.VisitorCount.HourlyVisitorCountDto;
import com.a208.mrlee.dto.VisitorCount.HourlyVisitorCountSaveDto;
import com.a208.mrlee.entity.VisitorCount.DailyVisitorCount;
import com.a208.mrlee.entity.VisitorCount.HourlyVisitorCount;
import com.a208.mrlee.exception.DateAlreadyExistException;
import com.a208.mrlee.exception.DateTimeAlreadyExistException;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import com.a208.mrlee.repository.VisitorCount.DailyVisitorCountRepository;
import com.a208.mrlee.repository.VisitorCount.HourlyVisitorCountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Transactional
@Service
public class VisitorCountService {

    private final DailyVisitorCountRepository dailyVisitorCountRepository;
    private final HourlyVisitorCountRepository hourlyVisitorCountRepository;
    private final CustomerTrackingInfoRepository customerTrackingInfoRepository;

    public DailyVisitorCountDto createDailyVisitorCount(DailyVisitorCountSaveDto dto) {

        if (dailyVisitorCountRepository.existsByDate(dto.getDate())) {
            throw new DateAlreadyExistException("주어진 날짜에 해당하는 엔티티가 이미 존재합니다.");
        }

        DailyVisitorCount saved = dailyVisitorCountRepository.save(dto.toEntity());

        return DailyVisitorCountDto.fromEntity(saved);
    }

    public DailyVisitorCountDto createDailyVisitorCount(LocalDate date) {

        if (dailyVisitorCountRepository.existsByDate(date)) {
            throw new DateAlreadyExistException("주어진 날짜에 해당하는 엔티티가 이미 존재합니다.");
        }

        long numVisitor = countDailyVisitors(date);

        DailyVisitorCount entity = DailyVisitorCount
                .builder()
                .date(date)
                .numVisitor(numVisitor)
                .build();

        DailyVisitorCount saved = dailyVisitorCountRepository.save(entity);

        return DailyVisitorCountDto.fromEntity(saved);
    }


    public long countDailyVisitors(LocalDate date) {

        LocalDateTime start = LocalDateTime.of(
                date,
                LocalTime.of(0, 0, 0)
        );

        LocalDateTime end = LocalDateTime.of(
                date,
                LocalTime.of(23, 59, 59)
        );

        return customerTrackingInfoRepository.countByCreatedBetween(start, end);
    }

    public long countHourlyVisitors(LocalDate date, int hour) {

        // 0 <= hour < 24
        if (hour < 0 || hour >= 24) {
            throw new IllegalArgumentException("매개변수 \'hour\'가 [0, 24) 범위 내의 정수가 아닙니다.");
        }

        LocalDateTime start = LocalDateTime.of(date, LocalTime.of(hour, 0, 0));
        LocalDateTime end = LocalDateTime.of(date, LocalTime.of(hour, 59, 59));

        return customerTrackingInfoRepository.countByCreatedBetween(start, end);
    }

    public DailyVisitorCountDto findDailyVisitorCount(LocalDate date) {

        DailyVisitorCount entity = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(() -> new NoSuchElementException());

        return DailyVisitorCountDto.fromEntity(entity);
    }

    public DailyVisitorCountDto updateDailyVisitorCount(LocalDate date, long newNumVisitor) {

        if(newNumVisitor < 0L){
            throw new IllegalArgumentException("매개변수 \'newNumVisitor\'는 0 이상이어야 합니다.");
        }

        DailyVisitorCount entity = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(() -> new NoSuchElementException("주어진 날짜에 해당하는 DailyVisitorCount 엔티티를 찾을 수 없습니다."));

        entity.setNumVisitor(newNumVisitor);

        return DailyVisitorCountDto.fromEntity(entity);
    }

    public Long deleteDailyVisitorCount(LocalDate date) {

        DailyVisitorCount evictor = dailyVisitorCountRepository.findByDate(date)
                .orElseThrow(() -> new NoSuchElementException("삭제하려는 엔티티가 존재하지 않습니다."));

        Long evictorId = evictor.getId();

        dailyVisitorCountRepository.deleteById(evictorId);

        return evictorId;
    }

    public HourlyVisitorCountDto createHourlyVisitorCount(HourlyVisitorCountSaveDto dto) {

        if (hourlyVisitorCountRepository.existsByDateTime(dto.getDateTime())) {
            throw new DateTimeAlreadyExistException("주어진 날짜, 시간에 해당하는 엔티티가 이미 존재합니다.");
        }

        HourlyVisitorCount entity = HourlyVisitorCount.builder()
                .dateTime(dto.getDateTime())
                .numVisitor(dto.getNumVisitor())
                .build();

        HourlyVisitorCount saved = hourlyVisitorCountRepository.save(entity);

        return HourlyVisitorCountDto.fromEntity(saved);
    }

    public HourlyVisitorCountDto findHourlyVisitorCount(LocalDate date, int hour) {

        if (hour < 0 || hour >= 24) {
            throw new IllegalArgumentException("매개변수 \'hour\'가 [0, 24) 범위의 정수가 아닙니다.");
        }

        HourlyVisitorCount entity = hourlyVisitorCountRepository.findByDateTime(
                LocalDateTime.of(
                        date,
                        LocalTime.of(hour, 0, 0)
                )
        ).orElseThrow(NoSuchElementException::new);

        return HourlyVisitorCountDto.fromEntity(entity);
    }

    public List<HourlyVisitorCountDto> findHourlyVisitorCounts(LocalDate date) {

        List<HourlyVisitorCountDto> hourlyVisitorCountDtoList = new ArrayList<>();

        for (int hour = 0; hour < 24; ++hour) {

            LocalDateTime dateTime = LocalDateTime.of(
                    date,
                    LocalTime.of(hour, 0, 0)
            );

            hourlyVisitorCountRepository.findByDateTime(dateTime)
                    .ifPresentOrElse(
                            (e) -> hourlyVisitorCountDtoList.add(HourlyVisitorCountDto.fromEntity(e)),
                            () -> hourlyVisitorCountDtoList.add(new HourlyVisitorCountDto(null, dateTime, 0L))
                    );
        }

        return hourlyVisitorCountDtoList;
    }

    public HourlyVisitorCountDto updateHourlyVisitorCount(LocalDate date, int hour, long newNumVisitor){

        if(hour < 0 || hour >= 24){
            throw new IllegalArgumentException("매개변수 \'hour\'가 [0, 24) 범위 내의 정수가 아닙니다.");
        }

        if(newNumVisitor < 0L){
            throw new IllegalArgumentException("매개변수 \'newNumVisitor\'는 0 이상이어야 합니다.");
        }

        LocalDateTime dateTime = LocalDateTime.of(
                date,
                LocalTime.of(hour, 0,0)
        );

        HourlyVisitorCount entity = hourlyVisitorCountRepository.findByDateTime(dateTime)
                .orElseThrow(() -> new NoSuchElementException("주어진 날짜, 시간대의 HourlyVisitorCount 엔티티를 찾을 수 없습니다."));

        entity.setNumVisitor(newNumVisitor);

        return HourlyVisitorCountDto.fromEntity(entity);
    }

    public Long deleteHourlyVisitorCount(LocalDate date, int hour){

        if (hour < 0 || hour >= 24) {
            throw new IllegalArgumentException("매개변수 \'hour\'가 [0, 24) 범위의 정수가 아닙니다.");
        }

        LocalDateTime dateTime = LocalDateTime.of(
                date,
                LocalTime.of(hour, 0,0)
        );

        HourlyVisitorCount evictor = hourlyVisitorCountRepository.findByDateTime(dateTime)
                .orElseThrow(() -> new NoSuchElementException("주어진 날짜, 시간대의 HourlyVisitorCount 엔티티를 찾을 수 없습니다."));

        Long evictorId = evictor.getId();

        hourlyVisitorCountRepository.delete(evictor);

        return evictorId;
    }


}
