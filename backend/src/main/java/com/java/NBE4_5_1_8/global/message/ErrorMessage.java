package com.java.NBE4_5_1_8.global.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage implements MessageType{
    ITEM_NOT_FOUND("존재하지 않는 상품입니다."),
    ORDER_NOT_FOUND("존재하지 않는 주문입니다."),
    INVALID_REQUEST("잘못된 요청입니다."),
    ITEM_CANNOT_BE_DELETED("주문된 상품은 삭제할 수 없습니다.");

    private final String message;
}
