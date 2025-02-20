package com.java.NBE4_5_1_8.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import com.java.NBE4_5_1_8.domain.item.entity.Item;

@Getter
@Setter
@AllArgsConstructor
public class ItemDto {
    private String itemName;
    private String category;
    private String description;
    private int stockQuantity;

    public ItemDto(Item item) {
        this.itemName = item.getItemName();
        this.category = item.getCategory();
        this.description = item.getDescription();
        this.stockQuantity = item.getStockQuantity();
    }
}
