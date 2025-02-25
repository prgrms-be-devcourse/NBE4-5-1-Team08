package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.email.service.EmailService;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderInfoDto;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderItem;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderItemRepository;
import com.java.NBE4_5_1_8.global.exception.ServiceException;
import com.java.NBE4_5_1_8.global.message.ErrorMessage;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderInfoService {
    private final OrderInfoRepository orderInfoRepository;
    private final ItemRepository itemRepository;
    private final OrderItemRepository orderItemRepository;
    private final EmailService emailService;

    @Transactional
    public OrderInfo createOrderInfo(OrderForm orderForm) {
        OrderInfo orderInfo = new OrderInfo(orderForm);

        List<OrderItem> orderItems = orderForm.getItemList().stream()
                .map(dto -> {
                    Item item = itemRepository.findById(dto.getItemId())
                            .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_NOT_FOUND));

                    if (item.getStockQuantity() - dto.getQuantity() < 0) {
                        throw new ServiceException(
                                HttpStatus.BAD_REQUEST,
                                ErrorMessage.OUT_OF_STUCK
                        );
                    }

                    item.setStockQuantity(item.getStockQuantity() - dto.getQuantity());
                    OrderItem orderItem = new OrderItem(item, orderInfo, dto.getQuantity());
                    orderItem.setOrderPrice(item.getPrice() * dto.getQuantity());
                    return orderItem;
                })
                .collect(Collectors.toList());

        orderInfo.setOrderItems(orderItems);
        orderInfoRepository.save(orderInfo);

        emailService.sendOrderConfirmation(orderForm.getMemberEmail(), orderInfo.getOrderId(), orderItems);
        return orderInfo;
    }

    public OrderInfo getOrderInfoById(Long id) {
        return orderInfoRepository.findById(id)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ORDER_NOT_FOUND));
    }

    public OrderInfoDto getOrderInfoByIdAndMemberPassword(Long orderId, String memberPassword) {
        return orderInfoRepository.findByOrderIdAndMemberPassword(orderId, memberPassword);
    }

    @Transactional
    public void updateOrderInfo(OrderInfo orderInfo, OrderStatus orderStatus, String memberEmail, String memberAddress) {
        orderInfo.setOrderStatus(orderStatus);
        orderInfo.setMemberEmail(memberEmail);
        orderInfo.setMemberAddress(memberAddress);
    }

    @Transactional
    public void cancelOrderInfo(Long orderId) {
        OrderInfo orderInfo = getOrderInfoById(orderId);

        if (!orderInfo.getOrderStatus().equals(OrderStatus.ORDERED)) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ORDER_CANNOT_BE_DELETED);
        }

        orderInfo.setOrderStatus(OrderStatus.CANCELLED);

        for (OrderItem orderItem : orderInfo.getOrderItems()) {
            Item item = orderItem.getItem();
            item.setStockQuantity(item.getStockQuantity() + orderItem.getQuantity());
        }
    }

    @Scheduled(cron = "0 0 14 * * *", zone = "Asia/Seoul")
    @Transactional
    public void scheduleOrderProcessing() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime today14 = now.withHour(14).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime yesterday14 = today14.minusDays(1);

        List<OrderInfo> shippingList = orderInfoRepository.findAllByOrderStatus(OrderStatus.SHIPPING);
        for (OrderInfo orderInfo : shippingList) {
            orderInfo.setOrderStatus(OrderStatus.DELIVERED);
        }

        List<OrderInfo> orderInfoList = orderInfoRepository.findAllByOrderStatusAndCreatedDateBetween(OrderStatus.ORDERED, yesterday14, today14);
        for (OrderInfo orderInfo : orderInfoList) {
            orderInfo.setOrderStatus(OrderStatus.SHIPPING);
        }
    }

    public OrderItem getOrderItemById(Long orderItemId) {
        return orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ORDER_NOT_FOUND));
    }

    @Transactional
    public void updateOrderItem(OrderItem orderItem, @NotNull Long itemId, @NotNull int quantity) {
        orderItem.setItem(itemRepository.findById(itemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_NOT_FOUND)));
        orderItem.setQuantity(quantity);
    }
}