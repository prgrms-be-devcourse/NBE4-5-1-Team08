package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.domain.orderinfo.dto.OrderForm;
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
    public Long createOrderInfo(OrderForm orderForm) {
        Item item = itemRepository.findById(orderForm.getItemId())
                .orElseThrow(EntityExistsException::new);

        OrderInfo orderInfo = orderInfoRepository.findByMemberEmail(orderForm.getMemberEmail());
        if (orderInfo == null) {
            orderInfo = OrderInfo.createOrderInfo(orderForm.getMemberEmail());
            orderInfoRepository.save(orderInfo);
        }

        int totalPrice = item.getPrice() * orderForm.getQuantity();
        OrderItem orderItem = OrderItem.createOrderItem(item, orderInfo, totalPrice, orderForm.getQuantity());
        orderItemRepository.save(orderItem);
        return orderItem.getId();
    }
}
