package com.a208.mrlee.service.VisitorCount;

import com.a208.mrlee.dto.VisitorCount.DailyVisitorCountDto;
import com.a208.mrlee.dto.VisitorCount.DailyVisitorCountSaveDto;
import com.a208.mrlee.entity.CustomerTrackingInfo.CustomerTrackingInfo;
import com.a208.mrlee.entity.VisitorCount.DailyVisitorCount;
import com.a208.mrlee.exception.DateAlreadyExistException;
import com.a208.mrlee.repository.CustomerTrackingInfo.CustomerTrackingInfoRepository;
import com.a208.mrlee.repository.VisitorCount.DailyVisitorCountRepository;
import com.a208.mrlee.repository.VisitorCount.HourlyVisitorCountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
class VisitorServiceTest {

    @Mock
    private DailyVisitorCountRepository dailyVisitorCountRepository;
    @Mock
    private HourlyVisitorCountRepository hourlyVisitorCountRepository;
    @Mock
    private CustomerTrackingInfoRepository customerTrackingInfoRepository;
    @InjectMocks
    private VisitorService visitorService;

    private LocalDate date;
    private LocalDate dateAlreadyExist;
    private LocalDateTime start;
    private LocalDateTime end;
    private Long id;
    private Long numVisitor;
    private DailyVisitorCount possibleSaveResult;
    private List<CustomerTrackingInfo> possibleFindCreatedBetweenResult;

    @BeforeEach
    void setUp() {
        date = LocalDate.of(2023, 5, 14);
        dateAlreadyExist = LocalDate.of(1996, 12, 14);
        start = LocalDateTime.of(
                date,
                LocalTime.of(0, 0, 0)
        );
        end = LocalDateTime.of(
                date,
                LocalTime.of(23, 59, 59)
        );
        id = 1L;
        numVisitor = 10L;
        possibleSaveResult = new DailyVisitorCount(id, date, numVisitor);

        String[] tids = {"1_1", "1_2", "2_1", "2_2", "3_1", "3_2", "4_1", "4_2", "5_1", "5_2"};
        possibleFindCreatedBetweenResult = Arrays
                .stream(tids)
                .map(tid -> CustomerTrackingInfo.builder()
                        .created(start)
                        .tid(tid)
                        .build())
                .collect(Collectors.toList());
    }

    @Test
    @DisplayName(".createDailyVisitorCount(Dto) 중복되는 날짜가 없는 경우 레코드 생성에 성공한다.")
    void shouldCreateSuccessfully() {

        final DailyVisitorCountSaveDto saveDto = new DailyVisitorCountSaveDto(date, numVisitor);
        final DailyVisitorCount possibleSaveResult = DailyVisitorCount.builder()
                .id(id)
                .date(date)
                .numVisitor(numVisitor)
                .build();

        given(dailyVisitorCountRepository.existsByDate(date)).willReturn(false);

        given(dailyVisitorCountRepository.save(any(DailyVisitorCount.class)))
                .willReturn(possibleSaveResult);

        visitorService.createDailyVisitorCount(saveDto);

        then(dailyVisitorCountRepository)
                .should()
                .save(any(DailyVisitorCount.class));
    }

    @Test
    @DisplayName(".createDailyVisitorCount(Date) 중복되는 날짜가 없는 경우 방문자의 수와 상관없이 레코드 생성에 성공한다.")
    void shouldCreateSuccessfully1() {

//        given(customerTrackingInfoRepository.findByCreatedBetween(start, end))
//                .willReturn(possibleFindCreatedBetweenResult);

        given(dailyVisitorCountRepository.save(any(DailyVisitorCount.class)))
                .willReturn(possibleSaveResult);

        visitorService.createDailyVisitorCount(date);

        then(dailyVisitorCountRepository)
                .should()
                .save(any(DailyVisitorCount.class));
    }

    @Test
    @DisplayName(".createDailyVisitorCount 실패")
    void shouldThrowErrorWhenDateAlreadyExist() {

        final DailyVisitorCountSaveDto saveDto = new DailyVisitorCountSaveDto(dateAlreadyExist, numVisitor);

        // 주어진 날짜에 해당하는 레코드가 이미 있다고 가정하자.
        given(dailyVisitorCountRepository.existsByDate(dateAlreadyExist))
                .willReturn(true);

        // date 칼럼에 Unique 제약이 걸려있으므로 예외가 발생해야한다.
        assertThrows(
                DateAlreadyExistException.class,
                () -> visitorService.createDailyVisitorCount(saveDto)
        );
    }

    @Test
    @DisplayName(".findDailyVisitorCount 성공")
    void shouldFindSuccessfully() {

        final DailyVisitorCount expected = new DailyVisitorCount(id, date, numVisitor);

        given(dailyVisitorCountRepository.findByDate(date)).willReturn(Optional.of(expected));

        DailyVisitorCountDto result = visitorService.findDailyVisitorCount(date);

        then(dailyVisitorCountRepository)
                .should()
                .findByDate(date);

        assertThat(result)
                .isNotNull()
                .hasFieldOrPropertyWithValue("id", id)
                .hasFieldOrPropertyWithValue("date", date)
                .hasFieldOrPropertyWithValue("numVisitor", numVisitor);
    }

    @Test
    @DisplayName(".findDailyVisitorCount 실패")
    void shouldThrowErrorWhenTryToFindDateNotExisting() {

        // 주어진 날짜에 해당하는 레코드가 없다고 가정하자.
        given(dailyVisitorCountRepository.findByDate(date))
                .willReturn(Optional.empty());

        // DailyVisitorCountService.findByDate 함수에 예외가 발생해야한다.
        assertThrows(
                NoSuchElementException.class,
                () -> visitorService.findDailyVisitorCount(date)
        );
    }

    @Test
    @DisplayName(".updateDailyVisitorCount 성공")
    void shouldUpdateNumVisitorSuccessfully() {

        final Long newNumVisitor = 20L;

        DailyVisitorCount dailyVisitorCount = new DailyVisitorCount(id, date, numVisitor);

        given(dailyVisitorCountRepository.findByDate(date))
                .willReturn(Optional.of(dailyVisitorCount));

        visitorService.updateDailyVisitorCount(date, newNumVisitor);

        then(dailyVisitorCountRepository)
                .should()
                .findByDate(date);
    }

    @Test
    @DisplayName(".updateDailyVisitorCount 실패")
    void shouldThrowErrorWhenTryToUpdateDateNotExisting() {

        // 주어진 날짜에 해당하는 레코드가 없다고 가정하자.
        given(dailyVisitorCountRepository.findByDate(date))
                .willReturn(Optional.empty());

        // DailyVisitorCountService.updateNumVisitorOfDate 함수에서 예외가 발생해야한다.
        assertThrows(
                NoSuchElementException.class,
                () -> visitorService.updateDailyVisitorCount(date, numVisitor)
        );
    }

    @Test
    @DisplayName(".deleteDailyVisitorCount 성공")
    void shouldDeleteSuccessfully() {

        final DailyVisitorCount dailyVisitorCount = new DailyVisitorCount(id, date, numVisitor);

        given(dailyVisitorCountRepository.findByDate(date))
                .willReturn(Optional.of(dailyVisitorCount));

        visitorService.deleteDailyVisitorCount(date);

        then(dailyVisitorCountRepository)
                .should()
                .deleteById(id);
    }

    @Test
    @DisplayName(".deleteDailyVisitorCount 실패")
    void shouldThrowErrorWhenTryToDeleteDateNotExisting() {

        given(dailyVisitorCountRepository.findByDate(date))
                .willReturn(Optional.empty());

        assertThrows(
                NoSuchElementException.class,
                () -> visitorService.deleteDailyVisitorCount(date)
        );
    }
}