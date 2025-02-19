package com.java.NBE4_5_1_8.domain.orderInfo.repository;

import com.java.NBE4_5_1_8.domain.orderInfo.entiry.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long> {
}
