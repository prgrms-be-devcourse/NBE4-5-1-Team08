package com.java.NBE4_5_1_8.domain.item.dto;

import com.java.NBE4_5_1_8.domain.item.entity.Item;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemForm {
    private String itemName;
    private String category;
    private String description;
    private int stockQuantity;
    private int price;

    public ItemForm(Item item) {
        this.itemName = item.getItemName();
        this.category = item.getCategory();
        this.description = item.getDescription();
        this.stockQuantity = item.getStockQuantity();
        this.price = item.getPrice();
    }
}
