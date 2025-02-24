package com.java.NBE4_5_1_8.domain.orderinfo.repository;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {
    OrderInfo findByOrderIdAndMemberPassword(Long orderId, String password);
}
