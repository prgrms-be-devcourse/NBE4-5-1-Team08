package com.java.NBE4_5_1_8.global.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SuccessMessage implements MessageType{
    ITEM_CREATED("상품 등록 성공"),
    ITEM_UPDATED("상품 수정 성공"),
    ITEM_DELETED("상품 삭제 성공"),
    ITEM_FETCHED("상품 단건 조회 성공"),
    ITEM_LIST_FETCHED("상품 목록 조회 성공");

    private final String message;
}