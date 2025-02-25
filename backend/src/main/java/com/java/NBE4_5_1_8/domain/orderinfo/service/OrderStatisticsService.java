package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderStatisticsService {
    private final OrderInfoRepository orderInfoRepository;

    public OrderStatisticsService(OrderInfoRepository orderInfoRepository) {
        this.orderInfoRepository = orderInfoRepository;
    }


    public List<Map.Entry<Integer, Integer>> getHourlySales(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        List<OrderInfo> orders = orderInfoRepository.findByOrderStatusAndCreatedDateBetween(
                OrderStatus.DELIVERED, startOfDay, endOfDay
        );

        // 24시간 초기화 (매출 없는 시간대도 0으로 반환)
        Map<Integer, Integer> hourlySales = new HashMap<>();
        for (int i = 0; i < 24; i++) {
            hourlySales.put(i, 0);
        }

        // 시간별 매출 합산
        for (OrderInfo order : orders) {
            int hour = order.getCreatedDate().getHour();
            int orderTotal = order.getOrderItems().stream()
                    .mapToInt(item -> item.getOrderPrice() * item.getQuantity())
                    .sum();
            hourlySales.put(hour, hourlySales.get(hour) + orderTotal);
        }

        // JSON 형식으로 변환
        return hourlySales.entrySet().stream().toList();
    }


    public List<Map.Entry<LocalDate, Integer>> getDailySales(LocalDate startDate, LocalDate endDate) {
        List<OrderInfo> orders = orderInfoRepository.findByOrderStatusAndCreatedDateBetween(
                OrderStatus.DELIVERED, startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay()
        );

        // 날짜별 매출 초기화 (매출 없는 날짜도 0으로 반환)
        Map<LocalDate, Integer> dailySales = new TreeMap<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            dailySales.put(date, 0);
        }

        // 일별 매출 합산
        for (OrderInfo order : orders) {
            LocalDate orderDate = order.getCreatedDate().toLocalDate();
            int orderTotal = order.getOrderItems().stream()
                    .mapToInt(item -> item.getOrderPrice() * item.getQuantity())
                    .sum();
            dailySales.put(orderDate, dailySales.get(orderDate) + orderTotal);
        }

        // JSON 형식으로 변환
        return dailySales.entrySet().stream().toList();
    }
}