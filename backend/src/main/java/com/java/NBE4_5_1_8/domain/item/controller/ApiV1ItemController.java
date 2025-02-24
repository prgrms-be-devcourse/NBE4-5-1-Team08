package com.java.NBE4_5_1_8.domain.item.controller;

import com.java.NBE4_5_1_8.domain.item.dto.ItemDto;
import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.service.ItemService;
import com.java.NBE4_5_1_8.global.message.SuccessMessage;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/v1/items")
public class ApiV1ItemController {

    private final ItemService itemService;

    @PostMapping
    public RsData<ItemDto> createItem(@ModelAttribute ItemForm requestForm) {
        Item item = itemService.createItem(requestForm);

        return RsData.success(
                HttpStatus.OK,
                new ItemDto(item),
                SuccessMessage.ITEM_CREATED);
    }

    @GetMapping
    public RsData<List<ItemDto>> getItemList() {
        List<Item> items = itemService.getItemList();
        return RsData.success(
                HttpStatus.OK,
                items.stream()
                        .map(ItemDto::new)
                        .toList(),
                SuccessMessage.ITEM_LIST_FETCHED);
    }

    @GetMapping("/{itemId}")
    public RsData<ItemDto> getItemById(@PathVariable Long itemId) {

        Item item = itemService.getItemById(itemId);

        return RsData.success(
                HttpStatus.OK,
                new ItemDto(item),
                SuccessMessage.ITEM_FETCHED);

    }

    @PutMapping("/{itemId}")
    public RsData<ItemDto> updateItem(@PathVariable Long itemId, @ModelAttribute ItemForm requestForm) {

        Item item = itemService.getItemById(itemId);
        itemService.updateItem(item, requestForm);

        return RsData.success(
                HttpStatus.OK,
                new ItemDto(item),
                SuccessMessage.ITEM_UPDATED);
    }

    @DeleteMapping("/{itemId}")
    public RsData<Void> deleteItemById(@PathVariable Long itemId) {

        Item item = itemService.getItemById(itemId);
        itemService.deleteItem(item);

        return RsData.success(
                HttpStatus.OK,
                SuccessMessage.ITEM_UPDATED);
    }
}