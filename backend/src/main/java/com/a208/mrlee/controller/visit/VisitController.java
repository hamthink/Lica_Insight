package com.a208.mrlee.controller.visit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.dto.CustomerTrackingInfo.TrackXYDTO;
import com.a208.mrlee.dto.VisitorCount.*;
import com.a208.mrlee.service.visit.VisitService;
import com.a208.mrlee.service.visitor.VisitorService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/visit")
@Api("VISIT Api")
@RequiredArgsConstructor
public class VisitController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final VisitService visitService;
    private final VisitorService visitorService;
    private DateTimeFormatter localDateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
    private DateTimeFormatter localDateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    private LocalDate toLocalDate(String dateTimeStr) {
        return LocalDate.parse(dateTimeStr, localDateFormatter);
    }

    private LocalDateTime toLocalDateTime(String dateTimeStr) {
        return LocalDateTime.parse(dateTimeStr, localDateTimeFormatter);
    }

    @GetMapping
    public ResponseEntity<?> record(@RequestParam String start, @RequestParam String end) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime startTime = LocalDateTime.parse(start, formatter);
        LocalDateTime endTime = LocalDateTime.parse(end, formatter);
        try {
            List<CustomerTrackingInfoDTO> list = visitService.getTrackingInfo(startTime, endTime);
            resultMap.put("infoList", list);
            resultMap.put("result", SUCCESS);
        } catch (Exception e) {
            resultMap.put("result", FAIL);
        }
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/track")
    public ResponseEntity<?> track(@RequestParam String start, @RequestParam String end) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime startTime = LocalDateTime.parse(start, formatter);
        LocalDateTime endTime = LocalDateTime.parse(end, formatter);
        try {
            Map<String, List<TrackXYDTO>> map = visitService.getTrack(startTime, endTime);
            resultMap.put("trackList", map);
            resultMap.put("result", SUCCESS);
        } catch (Exception e) {
            resultMap.put("result", FAIL);
        }
        return ResponseEntity.ok(resultMap);
    }

    @GetMapping("/track/throttled")
    public ResponseEntity<?> getThrottledAndFilteredTrackingInfoGroupByTid(
            @RequestParam String start,
            @RequestParam String end) {

        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("trackList",
                visitService.getThrottledAndFilteredTrackingInfo(
                        toLocalDateTime(start),
                        toLocalDateTime(end)));

        return ResponseEntity.ok(resultMap);
    }

    // 일주일 전부터 요청한 날짜까지 일간 방문자 통계 데이터를 반환한다
    @GetMapping("/weekly-visitor-statistics")
    public ResponseEntity<WeeklyVisitorStats> getWeeklyVisitorStats(@RequestParam String endDate) {

        return ResponseEntity.ok(visitorService.getWeeklyVisitorStats(endDate));
    }

    // 요청한 날짜의 시간별 방문자 통계 데이터를 반환한다
    @GetMapping("/daily-visitor-statistics")
    public ResponseEntity<DailyVisitorStats> getDailyVisitorStats(@RequestParam String date) {

        return ResponseEntity.ok(
                visitorService.getDailyVisitorStats(
                        toLocalDate(date)
                ));
    }

    @PostMapping("/daily-visitor")
    public ResponseEntity<DailyVisitorCountDto> createDailyVisitor(@RequestParam String date) {

        return ResponseEntity.ok(
                visitorService.createDailyVisitorCount(
                        toLocalDate(date)
                ));
    }

    @PostMapping("/dummy/daily-visitor")
    public ResponseEntity<DailyVisitorCountDto> createDailyVisitor(@RequestBody DailyVisitorCountSaveDto dto) {

        return ResponseEntity.ok(visitorService.createDailyVisitorCount(dto));
    }

    @PostMapping("/hourly-visitor")
    public ResponseEntity<HourlyVisitorCountDtos> createHourlyVisitor(@RequestParam String date) {

        return ResponseEntity.ok(
                visitorService.createHourlyVisitorCounts(
                        toLocalDate(date)
                ));
    }

    @PostMapping("/dummy/hourly-visitor")
    public ResponseEntity<HourlyVisitorCountDto> createHourlyVisitor(@RequestBody HourlyVisitorCountSaveDto dto) {

        return ResponseEntity.ok(visitorService.createHourlyVisitorCount(dto));
    }
}