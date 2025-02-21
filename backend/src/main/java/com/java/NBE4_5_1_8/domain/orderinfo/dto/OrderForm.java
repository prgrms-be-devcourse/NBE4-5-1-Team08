package com.java.NBE4_5_1_8.domain.orderinfo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderForm {
    private Long itemId;
    private int quantity;
    private String memberEmail;
}
