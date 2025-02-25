package com.java.NBE4_5_1_8.domain.orderinfo.repository;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findAllByOrderInfo(OrderInfo orderInfo);

    boolean existsByItem(Item item);
}
