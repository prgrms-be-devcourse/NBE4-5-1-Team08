package com.java.NBE4_5_1_8.global.init;

import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.service.ItemService;
import com.java.NBE4_5_1_8.domain.orderinfo.service.OrderInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Random;


@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    private final ItemService itemService;
    private final OrderInfoService orderInfoService;
    private static final Random RANDOM = new Random();


    @Autowired
    @Lazy
    private BaseInitData self;

    @Bean
    public ApplicationRunner applicationRunner() {
        return args -> {
            self.itemInit();
        };
    }

    @Transactional
    public void itemInit() {

        if (itemService.count() > 0) {
            return;
        }

        // 샘플 아이템 데이터 생성
        itemService.createItem(new ItemForm("Columbia Nariñó", "커피콩", "고소한 풍미의 콜롬비아 원두", 200, 5000, null));
        itemService.createItem(new ItemForm("Brazil Serra Do Caparaó", "에스프레소", "밸런스 좋은 브라질 원두", 200, 5000, null));
        itemService.createItem(new ItemForm("Ethiopia Yirgacheffe", "드립커피", "산미가 조화로운 콜롬비아 원두", 200, 5000, null));

        // createOrderInfo 에서 orderInfo.setOrderItems(orderItems); 을 주석처리 하고 주석해제해서 만들 것 그리고 다시 주석해줘야함
//        IntStream.range(0, 100).forEach(i -> {
//            List<Item> allItems = itemService.findAll();
//            if (allItems.isEmpty()) return; // 아이템이 없으면 생성하지 않음
//
//
//            // OrderForm 생성
//            OrderForm orderForm = new OrderForm(
//                    List.of(new OrderItemDto(RANDOM.nextLong(allItems.size()) + 1, RANDOM.nextInt(5) + 1)),
//                    "user" + i + "@example.com",
//                    "password" + i,
//                    "Address " + i
//            );
//
//            // 주문 정보 생성 및 저장
//            OrderInfo orderInfo = orderInfoService.createOrderInfo(orderForm);
//            orderInfo.setOrderStatus(OrderStatus.DELIVERED);
//            orderInfo.setCreatedDate(getRandomDateTime());
//
//            orderInfoService.createOrderInfo(orderInfo);
//        });
    }

    private LocalDateTime getRandomDateTime() {
        LocalDate START_DATE = LocalDate.of(2025, 2, 1);
        LocalDate END_DATE = LocalDate.of(2025, 2, 25);

        int daysBetween = java.time.Period.between(START_DATE, END_DATE).getDays();
        LocalDate randomDate = START_DATE.plusDays(RANDOM.nextInt(daysBetween + 1));
        return randomDate.atTime(RANDOM.nextInt(24), RANDOM.nextInt(60));
    }

}
