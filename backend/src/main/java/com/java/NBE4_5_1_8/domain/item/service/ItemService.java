package com.java.NBE4_5_1_8.domain.item.service;

import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    @Transactional
    public Item createItem(ItemForm requestDto) {
        Item item = new Item();
        item.setItemName(requestDto.getItemName());
        item.setCategory(requestDto.getCategory());
        item.setDescription(requestDto.getDescription());
        item.setStockQuantity(requestDto.getStockQuantity());

        return itemRepository.save(item);
    }

    public List<Item> getItemList() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + itemId));
    }

    public long count() {
        return itemRepository.count();
    }

    public Item updateItem(Long itemId, ItemForm requestForm) {
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + itemId));

        item.setItemName(requestForm.getItemName());
        item.setCategory(requestForm.getCategory());
        item.setDescription(requestForm.getDescription());
        item.setStockQuantity(requestForm.getStockQuantity());

        return itemRepository.save(item);
    }
}
