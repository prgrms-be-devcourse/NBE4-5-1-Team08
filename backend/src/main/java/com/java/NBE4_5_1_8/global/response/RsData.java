package com.java.NBE4_5_1_8.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RsData<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> RsData<T> success(T data, String message) {
        return new RsData<>(true, message, data);
    }

    public static <T> RsData<T> failure(String message) {
        return new RsData<>(false, message, null);
    }
}
