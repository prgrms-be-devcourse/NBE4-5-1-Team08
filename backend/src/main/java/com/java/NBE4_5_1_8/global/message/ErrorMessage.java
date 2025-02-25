package com.java.NBE4_5_1_8.global.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage implements MessageType{
    ITEM_NOT_FOUND("존재하지 않는 상품입니다."),
    ORDER_NOT_FOUND("존재하지 않는 주문입니다."),
    INVALID_REQUEST("잘못된 요청입니다."),
    ITEM_CANNOT_BE_DELETED("주문된 상품은 삭제할 수 없습니다."),
    ORDER_CANNOT_BE_DELETED("삭제 불가능한 주문입니다."),
    CATEGORY_NOT_FOUND("존재하지 않는 카테고리입니다."),
    CATEGORY_ALREADY_EXISTS("이미 존재하는 카테고리입니다."),
    ITEM_BE_DISABLED("주문 내역이 있는 상품은 비활성화 처리되었습니다."),
    OUT_OF_STUCK("물품의 재고가 부족합니다.");



    private final String message;
}
