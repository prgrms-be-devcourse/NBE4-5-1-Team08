package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
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
        Long orderItemId = orderInfoService.createOrderInfo(orderForm);
        return RsData.success(
                HttpStatus.CREATED,
                SuccessMessage.ORDER_CREATED);
    }

    @GetMapping("{orderInfoId}")
    public RsData<Long> getOrderItemList(
            @RequestHeader("password") String password,
            @PathVariable("orderInfoId") Long orderInfoId) {

        Long orderItemId = orderInfoService.getOrderItemList(orderInfoId, password);
        return RsData.success(
                HttpStatus.OK,
                SuccessMessage.ORDER_LIST_FETCHED);
    }

    @PutMapping("/{orderId}")
    public RsData<OrderInfo> updateOrderInfo(@PathVariable long orderId, @RequestBody @Valid UpdateReqBody updateReqBody) {
        OrderInfo orderInfo = orderInfoService.getOrderById(orderId);
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
    public RsData<Void> deleteOrderInfo(@PathVariable long orderId) {
//        orderInfoService.deleteOrderInfo(orderId);
//        return RsData.success(
//                HttpStatus.OK,
//                "%d번 주문이 삭제되었습니다.".formatted(orderId));
        return cancelOrder(orderId);
    }

    @PostMapping("/{orderId}/cancel")
    public RsData<Void> cancelOrder(
            @PathVariable long orderId
    ) {
        orderInfoService.cancelOrder(orderId);
        return RsData.success(
                HttpStatus.OK,
                SuccessMessage.ORDER_DELETED);
    }

    @PutMapping("/{orderId}/{orderItemId}")
    public RsData<OrderItem> updateOrderItem(@PathVariable long orderItemId, @RequestBody @Valid UpdateOrderItemReqBody updateOrderItemReqBody) {
        OrderItem orderItem = orderInfoService.getOrderItemById(orderItemId);
        orderInfoService.updateOrderItem(orderItem, updateOrderItemReqBody.itemId,updateOrderItemReqBody.quantity());

        return RsData.success(
                HttpStatus.OK,
                SuccessMessage.ORDER_UPDATED);
    }

    public record UpdateOrderItemReqBody(
            @NotNull long itemId,
            @NotNull int quantity
    ) {
    }
}