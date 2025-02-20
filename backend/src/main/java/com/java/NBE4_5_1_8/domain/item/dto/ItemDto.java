package com.java.NBE4_5_1_8.domain.item.dto;

import lombok.*;
import com.java.NBE4_5_1_8.domain.item.entity.Item;

@Data
@NoArgsConstructor
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
