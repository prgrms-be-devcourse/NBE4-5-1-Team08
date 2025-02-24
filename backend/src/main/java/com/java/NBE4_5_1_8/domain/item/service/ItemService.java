package com.java.NBE4_5_1_8.domain.item.service;

import com.java.NBE4_5_1_8.domain.item.dto.ItemForm;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import com.java.NBE4_5_1_8.domain.item.repository.ItemRepository;
import com.java.NBE4_5_1_8.global.exception.ServiceException;
import com.java.NBE4_5_1_8.global.message.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        item.setPrice(requestForm.getPrice());
        return itemRepository.save(item);
    }

    public List<Item> getItemList() {
        return itemRepository.findAll();
    }

    public Item getItemById(Long itemId) {
        return itemRepository.findById(itemId)
                .orElseThrow(() -> new ServiceException(HttpStatus.BAD_REQUEST, ErrorMessage.ITEM_NOT_FOUND));
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

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
}
