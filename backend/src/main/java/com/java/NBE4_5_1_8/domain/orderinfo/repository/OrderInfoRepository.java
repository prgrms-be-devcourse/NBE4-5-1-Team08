package com.java.NBE4_5_1_8.domain.orderinfo.repository;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {
    OrderInfo findByOrderIdAndMemberPassword(Long orderId, String password);
    List<OrderInfo> findByOrderStatusAndCreatedDateBetween(OrderStatus orderStatus, LocalDateTime start, LocalDateTime end);
}
