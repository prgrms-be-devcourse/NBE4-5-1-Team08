package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderItem;
import com.java.NBE4_5_1_8.global.message.SuccessMessage;
import com.java.NBE4_5_1_8.global.response.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/orders")
@RequiredArgsConstructor
public class ApiV1OrderInfoController {

    private final OrderInfoService orderInfoService;

    @PostMapping
    public RsData<Long> createOrder(@RequestBody OrderForm orderForm) {
        Long orderItemId = orderInfoService.createOrderInfo(orderForm).getOrderId();
        return RsData.success(
                HttpStatus.CREATED, orderItemId,
                SuccessMessage.ORDER_CREATED);
    }

    @GetMapping("{orderId}")
    public RsData<OrderInfo> getOrderItemList(
            @RequestHeader("memberPassword") String memberPassword,
            @PathVariable("orderId") Long orderId) {

        OrderInfo OrderInfo = orderInfoService.getOrderInfoByIdAndMemberPassword(orderId, memberPassword);
        return RsData.success(
                HttpStatus.OK, OrderInfo,
                SuccessMessage.ORDER_LIST_FETCHED);
    }

    @PutMapping("/{orderId}")
    public RsData<OrderInfo> updateOrderInfo(@PathVariable Long orderId, @RequestBody @Valid UpdateReqBody updateReqBody) {
        OrderInfo orderInfo = orderInfoService.getOrderInfoById(orderId);
        orderInfoService.updateOrderInfo(
                orderInfo,
                updateReqBody.orderStatus(),
                updateReqBody.memberEmail,
                updateReqBody.memberAddress
        );
        return RsData.success(HttpStatus.OK,
                SuccessMessage.ORDER_UPDATED);
    }

    public record UpdateReqBody(
            @NotNull OrderStatus orderStatus,
            @Email String memberEmail,
            @Length(min = 3) String memberAddress) {
    }

    @DeleteMapping("/{orderId}")
    public RsData<Void> deleteOrderInfo(@PathVariable Long orderId) {
        orderInfoService.cancelOrderInfo(orderId);
        return RsData.success(
                HttpStatus.OK,
                SuccessMessage.ORDER_DELETED);
    }

    @PutMapping("/{orderId}/{orderItemId}")
    public RsData<OrderItem> updateOrderItem(@PathVariable Long orderItemId, @RequestBody @Valid UpdateOrderItemReqBody updateOrderItemReqBody) {
        OrderItem orderItem = orderInfoService.getOrderItemById(orderItemId);
        orderInfoService.updateOrderItem(orderItem, updateOrderItemReqBody.itemId,updateOrderItemReqBody.quantity());

        return RsData.success(
                HttpStatus.OK,
                SuccessMessage.ORDER_UPDATED);
    }

    public record UpdateOrderItemReqBody(
            @NotNull Long itemId,
            @NotNull int quantity
    ) {
    }
}