package com.java.NBE4_5_1_8.domain.orderinfo.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.java.NBE4_5_1_8.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonManagedReference
    private OrderInfo orderInfo;

    private int orderPrice;
    private int quantity;

    public OrderItem (Item item, OrderInfo orderInfo, int quantity) {
        this.item = item;
        this.orderInfo = orderInfo;
        this.quantity = quantity;
    }
}
