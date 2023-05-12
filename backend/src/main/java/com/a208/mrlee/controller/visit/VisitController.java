package com.a208.mrlee.controller.visit;

import com.a208.mrlee.dto.CustomerTrackingInfo.CustomerTrackingInfoDTO;
import com.a208.mrlee.service.visit.VisitService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("")
    public ResponseEntity<?> record(@RequestParam String start, @RequestParam String end) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startTime = LocalDateTime.parse(start, formatter);
        LocalDateTime endTime = LocalDateTime.parse(end, formatter);
        List<CustomerTrackingInfoDTO> list = visitService.getTrackingInfo(startTime, endTime);
        resultMap.put("infoList", list);
        return ResponseEntity.ok(resultMap);

    }

    @GetMapping("/track")
    public ResponseEntity<?> track(@RequestParam String start, @RequestParam String end) {
        Map<String, Object> resultMap = new HashMap<String, Object>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime startTime = LocalDateTime.parse(start, formatter);
        LocalDateTime endTime = LocalDateTime.parse(end, formatter);
        Map<String, List<CustomerTrackingInfoDTO>> map = visitService.getTrack(startTime, endTime);
        resultMap.put("trackList", map);
        return ResponseEntity.ok(resultMap);
    }
}
