package com.java.NBE4_5_1_8.domain.orderinfo.entity;

public enum OrderStatus {
    ORDERED("주문됨"),
    SHIPPING("배송중"),
    DELIVERED("배송완료"),
    CANCELLED("주문취소");

    private final String description;

    OrderStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
