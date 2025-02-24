package com.java.NBE4_5_1_8.domain.item.entity;

public enum Category {
    COFFEE_BEAN("커피콩"),
    COFFEE("커피"),
    TEA("차"),
    JUICE("주스"),
    DESERT("디저트");

    private final String categoryName;

    Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryName() {
        return categoryName;
    }

}
