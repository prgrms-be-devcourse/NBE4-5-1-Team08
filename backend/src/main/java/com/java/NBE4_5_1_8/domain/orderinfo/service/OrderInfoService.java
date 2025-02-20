package com.java.NBE4_5_1_8.domain.orderinfo.service;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderInfo;
import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderStatus;
import com.java.NBE4_5_1_8.domain.orderinfo.repository.OrderInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderInfoService {

    private final OrderInfoRepository orderInfoRepository;

    // Update
    @Transactional
    public void updateOrderInfo(OrderInfo orderInfo, OrderStatus orderStatus, String memberEmail, String memberAddress) {
        orderInfo.setOrderStatus(orderStatus);
        orderInfo.setMemberEmail(memberEmail);
        orderInfo.setMemberAddress(memberAddress);
    }
}
