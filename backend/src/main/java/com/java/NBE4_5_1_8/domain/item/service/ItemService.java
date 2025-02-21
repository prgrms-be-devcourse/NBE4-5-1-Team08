package com.java.NBE4_5_1_8.domain.item.service;

import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    @Transactional
    public Item createItem(ItemForm requestForm) {
        Item item = new Item();
        item.setItemName(requestForm.getItemName());
        item.setCategory(requestForm.getCategory());
        item.setDescription(requestForm.getDescription());
        item.setStockQuantity(requestForm.getStockQuantity());

        return itemRepository.save(item);
    }

    public List<Item> getItemList() {
        return itemRepository.findAll();
    }

    public Optional<Item> getItemById(Long itemId) {
        return itemRepository.findById(itemId);
    }

    public long count() {
        return itemRepository.count();
    }

    @Transactional
    public void updateItem(Item item, ItemForm requestForm) {

        item.setItemName(requestForm.getItemName());
        item.setCategory(requestForm.getCategory());
        item.setDescription(requestForm.getDescription());
        item.setStockQuantity(requestForm.getStockQuantity());

    }

    public void deleteItemById(Long itemId) {
        itemRepository.findById(itemId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 없습니다. id=" + itemId));

        itemRepository.deleteById(itemId);
    }
}
