package com.java.NBE4_5_1_8.domain.orderinfo.dto;

import com.java.NBE4_5_1_8.domain.orderitem.dto.OrderItemDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderForm {
    private List<OrderItemDto> itemList;
    private String memberEmail;
    private String memberPassword;
}
