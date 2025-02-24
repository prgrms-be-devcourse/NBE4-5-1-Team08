package com.java.NBE4_5_1_8.domain.orderinfo.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import com.java.NBE4_5_1_8.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private String memberPassword;

    @OneToMany(mappedBy = "orderInfo", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<OrderItem> orderItems = new ArrayList<>();

    private LocalDate deliveryDate;

    public OrderInfo(OrderForm orderForm) {
        this.orderStatus = OrderStatus.ORDERED;
        this.memberEmail = orderForm.getMemberEmail();
        this.memberPassword = orderForm.getMemberPassword();
        this.memberAddress = orderForm.getMemberAddress();
    }

    public OrderInfo() {
    }


    public void setDeliveryDateByOrderTime() {
        LocalDateTime orderTime = this.getCreatedDate();
        LocalDate orderDate = orderTime.toLocalDate();

        if (orderTime.getHour() >= 14) {
            this.deliveryDate = orderDate.plusDays(1);
        } else {
            this.deliveryDate = orderDate;
        }
    }
}
