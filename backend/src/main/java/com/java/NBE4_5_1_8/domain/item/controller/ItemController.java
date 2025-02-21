package com.java.NBE4_5_1_8.domain.item.controller;

import com.java.NBE4_5_1_8.domain.item.dto.ItemDto;
import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.service.ItemService;
import com.java.NBE4_5_1_8.global.exception.ServiceException;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/items")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public RsData<ItemDto> createItem(@RequestBody ItemForm requestForm) {
        Item item = itemService.createItem(requestForm);
        return RsData.success(new ItemDto(item), "상품 등록 성공");
    }

    @GetMapping
    public RsData<List<ItemDto>> getItemList() {
        List<Item> items = itemService.getItemList();
        return RsData.success(
                items
                        .stream()
                        .map(ItemDto::new)
                        .toList(),
                "상품 조회 성공");
    }

    @GetMapping("/{itemId}")
    public RsData<ItemDto> getItemById(@PathVariable Long itemId) {

        Item item = itemService.getItemById(itemId)
                .orElseThrow(() -> new ServiceException("존재하지 않는 상품입니다."));

        return RsData.success(new ItemDto(item), "상품 단건 조회 성공");
    }

    @PutMapping("/{itemId}")
    public RsData<ItemDto> updateItem(@PathVariable Long itemId, @RequestBody ItemForm requestForm) {

        Item item = itemService.getItemById(itemId)
                .orElseThrow(() -> new ServiceException("존재하지 않는 상품입니다."));

        itemService.updateItem(item, requestForm);

        return RsData.success(new ItemDto(item), "상품 수정 성공");
    }

    @DeleteMapping("/{itemId}")
    public RsData<Void> deleteItemById(@PathVariable Long itemId) {
        itemService.deleteItemById(itemId);
        return RsData.success(null, "상품 삭제 성공");
    }

}
