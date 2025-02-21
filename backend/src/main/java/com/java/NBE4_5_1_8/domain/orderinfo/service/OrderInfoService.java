package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderDto;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import com.java.NBE4_5_1_8.domain.orderitem.repository.OrderItemRepository;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderInfoService {
    private final OrderInfoRepository orderInfoRepository;
    private final OrderItemRepository orderItemRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public Long addOrderInfo(OrderDto orderDto) {
        Item item = itemRepository.findById(orderDto.getItemId())
                .orElseThrow(EntityExistsException::new);

        OrderInfo orderInfo = orderInfoRepository.findByMemberEmail(orderDto.getMemberEmail());
        if (orderInfo == null) {
            orderInfo = OrderInfo.createOrderInfo(orderDto.getMemberEmail());
            orderInfoRepository.save(orderInfo);
        }

        int totalPrice = item.getPrice() * orderDto.getQuantity();
        OrderItem orderItem = OrderItem.createOrderItem(item, orderInfo, totalPrice, orderDto.getQuantity());
        orderItemRepository.save(orderItem);
        return orderItem.getId();
    }
}
