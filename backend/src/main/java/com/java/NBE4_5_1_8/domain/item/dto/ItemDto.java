package com.java.NBE4_5_1_8.domain.item.dto;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long itemId;
    private String itemName;
    private String category;
    private String description;
    private int stockQuantity;

    public ItemDto(Item item) {
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.category = item.getCategory();
        this.description = item.getDescription();
        this.stockQuantity = item.getStockQuantity();
    }
}
