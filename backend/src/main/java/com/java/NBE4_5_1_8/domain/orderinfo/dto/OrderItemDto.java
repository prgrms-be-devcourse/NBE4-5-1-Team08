package com.java.NBE4_5_1_8.domain.orderinfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderItemDto {
    private Long itemId;
    private String itemName;
    private int quantity;
    private int price;
}
