package com.java.NBE4_5_1_8.domain.orderinfo.controller;

import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import com.java.NBE4_5_1_8.domain.orderitem.dto.OrderItemDto;
import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;

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
                orderItemId,
                "주문 추가 성공");
    }

    @GetMapping("{orderInfoId}")
    public RsData<Long> getOrderItemList(
            @RequestHeader("password") String password,
            @PathVariable("orderInfoId") Long orderInfoId) {

        Long orderItemId = orderInfoService.getOrderItemList(orderInfoId, password);
        return RsData.success(
                HttpStatus.OK,
                orderItemId,
                "주문 목록 조회 성공");
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
                orderInfo,
                "%d번 주문 수정이 완료되었습니다.".formatted(orderId));
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
                "%d번 주문이 취소되었습니다.".formatted(orderId));
    }

    @PutMapping("/{orderId}/{orderItemId}")
    public RsData<OrderItem> updateOrderItem(@PathVariable long orderItemId, @RequestBody @Valid UpdateOrderItemReqBody updateOrderItemReqBody) {
        OrderItem orderItem = orderInfoService.getOrderItemById(orderItemId);
        orderInfoService.updateOrderItem(orderItem, updateOrderItemReqBody.itemId,updateOrderItemReqBody.quantity());

        return RsData.success(
                HttpStatus.OK,
                orderItem,
                "해당 주문의 %d번 상품 수량이 %d개로 수정되었습니다.".formatted(orderItem.getItem().getItemId(), orderItem.getQuantity()));
    }

    public record UpdateOrderItemReqBody(
            @NotNull long itemId,
            @NotNull int quantity
    ) {
    }
}