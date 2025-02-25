package com.java.NBE4_5_1_8.domain.orderinfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class OrderForm {
    private List<OrderItemDto> itemList;
    private String memberEmail;
    private String memberPassword;
    private String memberAddress;
}
