package com.java.NBE4_5_1_8.domain.orderInfo.entiry;

import com.java.NBE4_5_1_8.global.entity.BaseTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Entity
@Getter
@Setter
public class OrderInfo extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long OrderId;
    private String OrderStatus;
    private String memberEmail;
    private String memberAddress;
}
