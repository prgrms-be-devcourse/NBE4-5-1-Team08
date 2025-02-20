package com.java.NBE4_5_1_8.domain.item.dto;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import lombok.*;

@Getter
@Setter
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
