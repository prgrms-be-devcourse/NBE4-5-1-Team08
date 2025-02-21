package com.java.NBE4_5_1_8.domain.orderinfo.entity;

import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import com.java.NBE4_5_1_8.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class OrderInfo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private String memberEmail;
    private String memberAddress;

    @OneToMany(mappedBy = "orderInfo")
    private List<OrderItem> orderItems = new ArrayList<>();

    public static OrderInfo createOrderInfo(String memberEmail, String memberAddress) {
        OrderInfo orderInfo = new OrderInfo();
        orderInfo.setOrderStatus(OrderStatus.ORDERED);
        orderInfo.setMemberEmail(memberEmail);
        orderInfo.setMemberAddress(memberAddress);
        return orderInfo;
    }
}
