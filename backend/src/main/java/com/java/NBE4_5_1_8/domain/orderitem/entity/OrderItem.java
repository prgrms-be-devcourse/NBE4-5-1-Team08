package com.java.NBE4_5_1_8.domain.orderitem.entity;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderInfo orderInfo;

    private int orderPrice;
    private int quantity;

    public static OrderItem createOrderItem(Item item, OrderInfo orderInfo, int orderPrice, int quantity) {
        OrderItem orderItem = new OrderItem();
        orderItem.setItem(item);
        orderItem.setOrderInfo(orderInfo);
        orderItem.setOrderPrice(orderPrice);
        orderItem.setQuantity(quantity);
        return orderItem;
    }
}
