package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import com.java.NBE4_5_1_8.global.response.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/v1/orders")
@RequiredArgsConstructor
public class ApiV1OrderInfoController {

    private final OrderInfoService orderInfoService;

    // Update
    public record UpdateReqBody(
            @NotNull OrderStatus orderStatus,
            @NotNull @Email String memberEmail,
            @NotNull @Length(min = 3) String memberAddress) {
    }
    @PutMapping("/{orderId}")
    public RsData<OrderInfo> updateOrderInfo(@PathVariable long orderId, @RequestBody @Valid UpdateReqBody updateReqBody) {
        try {
            OrderInfo orderInfo = orderInfoService.getOrderById(orderId).get();
            orderInfoService.updateOrderInfo(
                    orderInfo,
                    updateReqBody.orderStatus(),
                    updateReqBody.memberEmail(),
                    updateReqBody.memberAddress()
            );
            return RsData.success(orderInfo, "%d번 주문 수정이 완료되었습니다.".formatted(orderId));
        } catch (NoSuchElementException e) {
            return RsData.failure("%d번 주문 정보를 찾을 수 없습니다.".formatted(orderId));
        }
    }
}
