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
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
                            .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, "존재하지 않는 상품입니다."));

                    OrderItem orderItem = OrderItem.createOrderItem(item, orderInfo, dto.getQuantity());
                    orderItem.setOrderPrice(item.getPrice() * dto.getQuantity());
                    return orderItem;
                })
                .collect(Collectors.toList());

        orderInfo.setOrderItems(orderItems);
        orderInfoRepository.save(orderInfo);

        return orderInfo.getOrderId();
    }

    public OrderInfo getOrderById(Long id) {
        return orderInfoRepository.findById(id)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, "존재하지 않는 주문입니다."));
    }

    public Long getOrderItemList(Long orderInfoId, String password) {
        OrderInfo orderInfo = orderInfoRepository.findByOrderIdAndMemberPassword(orderInfoId, password);
        return orderInfo.getOrderId();
    }

    @Transactional
    public void updateOrderInfo(OrderInfo orderInfo, OrderStatus orderStatus, String memberEmail, String memberAddress) {
        orderInfo.setOrderStatus(orderStatus);
        orderInfo.setMemberEmail(memberEmail);
        orderInfo.setMemberAddress(memberAddress);
    }

    @Transactional
    public void deleteOrderInfo(long orderId) {
        OrderInfo orderInfo = getOrderById(orderId);

        if (!orderInfo.getOrderStatus().equals(OrderStatus.ORDERED)) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, "해당 주문은 삭제할 수 없습니다.");
        }

        orderInfoRepository.delete(orderInfo);
    }

    @Transactional
    public void cancelOrder(long orderId) {
        OrderInfo orderInfo = getOrderById(orderId);

        if (!orderInfo.getOrderStatus().equals(OrderStatus.ORDERED)) {
            throw new ServiceException(HttpStatus.BAD_REQUEST, "해당 주문은 취소할 수 없습니다.");
        }

        orderInfo.setOrderStatus(OrderStatus.CANCELLED);
    }

    public OrderItem getOrderItemById(long orderItemId) {
        return orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, "존재하지 않는 주문입니다."));
    }

    @Transactional
    public void updateOrderItem(OrderItem orderItem, @NotNull long itemId,@NotNull int quantity) {
        orderItem.setItem(itemRepository.findById(itemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, "존재하지 않는 상품입니다.")));
        orderItem.setQuantity(quantity);
    }
}