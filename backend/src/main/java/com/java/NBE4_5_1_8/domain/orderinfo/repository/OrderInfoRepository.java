package com.java.NBE4_5_1_8.domain.orderinfo.repository;

import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderInfoDto;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {
    OrderInfoDto findByOrderIdAndMemberPassword(Long orderId, String password);
    List<OrderInfo> findByOrderStatusAndCreatedDateBetween(OrderStatus orderStatus, LocalDateTime start, LocalDateTime end);

    List<OrderInfo> findAllByOrderStatus(OrderStatus orderStatus);

//    @Query("SELECT o FROM OrderInfo o WHERE o.orderStatus = 'ORDERED' AND o.createdDate BETWEEN :yesterday14 AND :today14")
//    List<OrderInfo> findAllOrderedBetweenYesterday14AndToday14(@Param("yesterday14") LocalDateTime yesterday14, @Param("today14") LocalDateTime today14);

    List<OrderInfo> findAllByOrderStatusAndCreatedDateBetween(OrderStatus orderStatus, LocalDateTime createdDateAfter, LocalDateTime createdDateBefore);
}
