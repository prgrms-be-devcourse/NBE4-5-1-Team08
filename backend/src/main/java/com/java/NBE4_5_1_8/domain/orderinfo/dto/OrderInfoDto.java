package com.java.NBE4_5_1_8.domain.orderinfo.dto;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Setter
@Getter
@AllArgsConstructor
public class OrderInfoDto {
    private Long orderId;
    private OrderStatus orderStatus;
    private String memberEmail;
    private String memberAddress;
//    private String memberPassword;
    private List<OrderItemDto> orderItems;

    public OrderInfoDto(OrderInfo orderInfo) {
        this.orderId = orderInfo.getOrderId();
        this.orderStatus = orderInfo.getOrderStatus();
        this.memberEmail = orderInfo.getMemberEmail();
        this.memberAddress = orderInfo.getMemberAddress();
        this.orderItems = orderInfo.getOrderItems().stream()
                .map(orderItem -> new OrderItemDto(
                        orderItem.getItem().getItemId(),
                        orderItem.getItem().getItemName(),
                        orderItem.getQuantity(),
                        orderItem.getOrderPrice()))
                .collect(Collectors.toList());
    }
}
