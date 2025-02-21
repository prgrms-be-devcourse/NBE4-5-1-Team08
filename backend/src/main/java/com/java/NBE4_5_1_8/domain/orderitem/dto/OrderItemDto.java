package com.java.NBE4_5_1_8.domain.orderitem.dto;

import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemDto {
    private Long orderItemId;
    private String itemName;
    private int quantity;
    private int price;

    public OrderItemDto(OrderItem orderItem) {
        this.orderItemId = orderItem.getId();
        this.itemName = orderItem.getItem().getItemName();
        this.quantity = orderItem.getQuantity();
        this.price = orderItem.getOrderPrice();
    }
}
