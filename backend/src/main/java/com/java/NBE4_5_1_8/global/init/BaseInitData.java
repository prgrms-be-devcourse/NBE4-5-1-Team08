package com.java.NBE4_5_1_8.global.init;

import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {
    private final ItemService itemService;

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

        // 샘플 아이템 데이터 생성
        itemService.createItem(new ItemForm("Columbia Nariñó", "커피콩", "고소한 풍미의 콜롬비아 원두", 200));
        itemService.createItem(new ItemForm("Brazil Serra Do Caparaó", "커피콩", "밸런스 좋은 브라질 원두", 200));
        itemService.createItem(new ItemForm("Columbia Nariñó", "커피콩", "산미가 조화로운 콜롬비아 원두", 200));

    }
}
