package com.java.NBE4_5_1_8.domain.orderitem.repository;

import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
