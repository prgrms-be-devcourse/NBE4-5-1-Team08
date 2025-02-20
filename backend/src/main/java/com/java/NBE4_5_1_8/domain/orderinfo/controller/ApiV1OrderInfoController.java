package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import com.java.NBE4_5_1_8.global.response.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class ApiV1OrderInfoController {

    private final OrderInfoService orderInfoService;

    @PutMapping("/{orderId}")
    public RsData<OrderInfo> updateOrderInfo(
            @PathVariable long orderId,
            @RequestBody @Valid UpdateReqBody updateReqBody
    ) {
        OrderInfo orderInfo = orderInfoService.getOrderById(orderId).get();
        orderInfoService.updateOrderInfo(
                orderInfo,
                updateReqBody.orderStatus(),
                updateReqBody.memberEmail(),
                updateReqBody.memberAddress()
        );
        return RsData.success(orderInfo, "주문이 성공적으로 수정되었습니다.");
    }

    // Update
    public record UpdateReqBody(
            @NotBlank @Length(min = 3) String orderStatus,
            @NotBlank @Length(min = 3) String memberEmail,
            @NotBlank @Length(min = 3) String memberAddress) {
    }
}
