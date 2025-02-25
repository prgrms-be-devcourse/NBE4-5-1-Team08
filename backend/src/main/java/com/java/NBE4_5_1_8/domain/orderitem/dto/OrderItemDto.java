package com.java.NBE4_5_1_8.domain.orderitem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OrderItemDto {
    private Long ItemId;
    private int quantity;
}
