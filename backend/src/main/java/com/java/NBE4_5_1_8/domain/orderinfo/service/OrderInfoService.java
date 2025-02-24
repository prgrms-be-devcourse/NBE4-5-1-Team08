package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import com.java.NBE4_5_1_8.domain.orderitem.repository.OrderItemRepository;
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

    @Transactional
    public Long createOrderInfo(OrderForm orderForm) {
        OrderInfo orderInfo = new OrderInfo(orderForm);

        List<OrderItem> orderItems = orderForm.getItemList().stream()
                .map(dto -> {
                    Item item = itemRepository.findById(dto.getItemId())
                            .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_NOT_FOUND));

                    OrderItem orderItem = OrderItem.createOrderItem(item, orderInfo, dto.getQuantity());
                    orderItem.setOrderPrice(item.getPrice() * dto.getQuantity());
                    return orderItem;
                })
                .collect(Collectors.toList());

        orderInfo.setOrderItems(orderItems);
        orderInfoRepository.save(orderInfo);
        orderInfo.setDeliveryDateByOrderTime();

        return orderInfo.getOrderId();
    }

    public OrderInfo getOrderById(Long id) {
        return orderInfoRepository.findById(id)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ORDER_NOT_FOUND));
    }

    public Long getOrderItemList(Long orderId, String memberPassword) {
        OrderInfo orderInfo = orderInfoRepository.findByOrderIdAndMemberPassword(orderId, memberPassword);
        return orderInfo.getOrderId();
    }

    @Transactional
    public void updateOrderInfo(OrderInfo orderInfo, OrderStatus orderStatus, String memberEmail, String memberAddress) {
        orderInfo.setOrderStatus(orderStatus);
        orderInfo.setMemberEmail(memberEmail);
        orderInfo.setMemberAddress(memberAddress);
    }

    @Transactional
    public void deleteOrderInfo(Long orderId) {
        OrderInfo orderInfo = getOrderById(orderId);

        if (!orderInfo.getOrderStatus().equals(OrderStatus.ORDERED)) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_CANNOT_BE_DELETED);
        }

        orderInfoRepository.delete(orderInfo);
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        OrderInfo orderInfo = getOrderById(orderId);

        if (!orderInfo.getOrderStatus().equals(OrderStatus.ORDERED)) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ORDER_CANNOT_BE_DELETED);
        }

        orderInfo.setOrderStatus(OrderStatus.CANCELLED);
    }


    @Scheduled(cron = "*/10 * * * * *", zone = "Asia/Seoul")
    @Transactional
    public void updateOrderStatus() {
        List<OrderInfo> orderInfoList = orderInfoRepository.findAllByOrderStatus(OrderStatus.ORDERED);

        for (OrderInfo orderInfo : orderInfoList) {
            orderInfo.setOrderStatus(OrderStatus.SHIPPING);
        }

//        orderInfoRepository.saveAll(orderInfoList);
        System.out.println("스케줄러 실행됨: " + LocalDateTime.now());
    }


    public OrderItem getOrderItemById(Long orderItemId) {
        return orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ORDER_NOT_FOUND));
    }

    @Transactional
    public void updateOrderItem(OrderItem orderItem, @NotNull Long itemId,@NotNull int quantity) {
        orderItem.setItem(itemRepository.findById(itemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_NOT_FOUND)));
        orderItem.setQuantity(quantity);
    }
}