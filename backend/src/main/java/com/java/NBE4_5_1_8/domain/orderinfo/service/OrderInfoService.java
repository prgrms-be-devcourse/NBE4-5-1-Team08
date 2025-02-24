package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import com.java.NBE4_5_1_8.domain.orderitem.dto.OrderItemDto;
import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import com.java.NBE4_5_1_8.domain.orderitem.repository.OrderItemRepository;
import com.java.NBE4_5_1_8.global.exception.ServiceException;
import jakarta.persistence.EntityExistsException;
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
    private final OrderItemRepository orderItemRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public Long createOrderInfo(OrderForm orderForm) {
        Item item = itemRepository.findById(orderForm.getItemId())
                .orElseThrow(EntityExistsException::new);

        OrderInfo orderInfo = orderInfoRepository.findByMemberEmail(orderForm.getMemberEmail());
        if (orderInfo == null) {
            orderInfo = OrderInfo.createOrderInfo(orderForm.getMemberEmail(), orderForm.getMemberAddress());
            orderInfoRepository.save(orderInfo);
        }

        int totalPrice = item.getPrice() * orderForm.getQuantity();
        OrderItem orderItem = OrderItem.createOrderItem(item, orderInfo, totalPrice, orderForm.getQuantity());
        orderItemRepository.save(orderItem);
        return orderItem.getId();
    }

    public OrderInfo getOrderById(Long id) {
        return orderInfoRepository.findById(id)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, "존재하지 않는 주문입니다."));
    }

    public List<OrderItemDto> getOrderItem(String memberEmail) {
        OrderInfo orderInfo = orderInfoRepository.findByMemberEmail(memberEmail);
        return orderItemRepository.findAllByOrderInfo(orderInfo)
                .stream()
                .map(OrderItemDto::new)
                .collect(Collectors.toList());
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