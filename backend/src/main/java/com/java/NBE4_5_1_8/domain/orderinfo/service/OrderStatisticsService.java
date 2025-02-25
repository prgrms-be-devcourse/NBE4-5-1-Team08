package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderStatisticsService {
    private final OrderInfoRepository orderInfoRepository;

    public OrderStatisticsService(OrderInfoRepository orderInfoRepository) {
        this.orderInfoRepository = orderInfoRepository;
    }

    public Map<String, Object> getHourlySales(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.plusDays(1).atStartOfDay();

        List<OrderInfo> orderList = orderInfoRepository.findByOrderStatusAndCreatedDateBetween(
                OrderStatus.DELIVERED, startOfDay, endOfDay
        );

        // 24시간 배열 초기화
        Map<Integer, Double> hourlySales = new HashMap<>();
        for (int i = 0; i < 24; i++) {
            hourlySales.put(i, 0.0);
        }

        // 각 주문의 시간별 매출 합산
        for (OrderInfo order : orderList) {
            int hour = order.getCreatedDate().getHour();
            double orderTotal = order.getOrderItems().stream()
                    .mapToDouble(item -> item.getOrderPrice() * item.getQuantity())
                    .sum();
            hourlySales.put(hour, hourlySales.get(hour) + orderTotal);
        }

        // 결과 데이터 구성
        List<String> labels = hourlySales.keySet().stream()
                .sorted()
                .map(hour -> String.format("%02d:00", hour))
                .collect(Collectors.toList());

        List<Double> data = new ArrayList<>(hourlySales.values());

        return Map.of("labels", labels, "data", data);
    }

    public Map<String, Object> getDailySales(LocalDate startDate, LocalDate endDate) {
        List<OrderInfo> orders = orderInfoRepository.findByOrderStatusAndCreatedDateBetween(
                OrderStatus.DELIVERED, startDate.atStartOfDay(), endDate.plusDays(1).atStartOfDay()
        );

        // 날짜별 매출 합산
        Map<LocalDate, Double> dailySales = new TreeMap<>();
        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            dailySales.put(date, 0.0);
        }

        for (OrderInfo order : orders) {
            LocalDate orderDate = order.getCreatedDate().toLocalDate();
            double orderTotal = order.getOrderItems().stream()
                    .mapToDouble(item -> item.getOrderPrice() * item.getQuantity())
                    .sum();
            dailySales.put(orderDate, dailySales.getOrDefault(orderDate, 0.0) + orderTotal);
        }

        // 결과 데이터 구성
        List<String> labels = dailySales.keySet().stream()
                .map(LocalDate::toString)
                .collect(Collectors.toList());

        List<Double> data = new ArrayList<>(dailySales.values());

        return Map.of("labels", labels, "data", data);
    }
}