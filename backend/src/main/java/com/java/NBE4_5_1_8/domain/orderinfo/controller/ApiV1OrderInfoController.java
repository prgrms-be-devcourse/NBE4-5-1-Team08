package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderDto;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class ApiV1OrderInfoController {
    private final OrderInfoService orderInfoService;

    @PostMapping("/add")
    public RsData<Long> create(@RequestBody OrderDto orderDto) {
        Long orderItemId = orderInfoService.addOrderInfo(orderDto);
        return RsData.success(orderItemId, "장바구니에 성공적으로 담았습니다.");
    }
}
