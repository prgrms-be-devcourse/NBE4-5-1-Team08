package com.java.NBE4_5_1_8.domain.item.entity;

import com.java.NBE4_5_1_8.domain.orderinfo.entity.OrderItem;
import com.java.NBE4_5_1_8.global.entity.BaseTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Item extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;
    private String itemName;
    @Column(nullable = false)
    private String category;
    private String description; // 제품 설명
    private int stockQuantity;
    private int price;
    private String imageUrl;

    @OneToMany(mappedBy = "item")
    private List<OrderItem> orderItems;
}
