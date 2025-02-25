package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderStatisticsService;
import com.java.NBE4_5_1_8.global.message.SuccessMessage;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/v1/statistics")
@RequiredArgsConstructor
public class ApiV1OrderStatisticsController {
    private final OrderStatisticsService orderStatisticsService;

    @GetMapping("/hourly")
    public RsData<Map<String, Object>> getHourlySales(
            @RequestParam(required = false) String date
    ) {
        LocalDate queryDate = (date == null) ? LocalDate.now() : LocalDate.parse(date);
        Map<String, Object> hourlySales = orderStatisticsService.getHourlySales(queryDate);

        return RsData.success(HttpStatus.OK, hourlySales, SuccessMessage.ORDER_CREATED);
    }

    @GetMapping("/daily")
    public RsData<Map<String, Object>> getDailySales(
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        Map<String, Object> dailySales = orderStatisticsService.getDailySales(
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        );

        return RsData.success(HttpStatus.OK, dailySales, SuccessMessage.ORDER_CREATED);
    }
}
