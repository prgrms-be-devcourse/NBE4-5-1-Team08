package com.java.NBE4_5_1_8.global.message;

import com.fasterxml.jackson.annotation.JsonValue;

public interface MessageType {
    @JsonValue
    String getMessage();
}
