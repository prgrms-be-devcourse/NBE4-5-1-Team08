package com.java.NBE4_5_1_8.domain.item.controller;

import com.java.NBE4_5_1_8.domain.item.dto.ItemDto;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.service.ItemService;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/item")
public class ItemController {

    private final ItemService itemService;


    @PostMapping
    public RsData<ItemDto> addItem(@RequestBody ItemDto requestDto) {
            Item item = itemService.createItem(requestDto);
            return RsData.success(new ItemDto(item), "상품 등록 성공");
    }

    @GetMapping
    public RsData<List<Item>> getItem() {
        //TODO item to itemDto
        List<Item> items = itemService.findAllItem();
        return RsData.success(items, "상품 조회 성공");
    }
}
