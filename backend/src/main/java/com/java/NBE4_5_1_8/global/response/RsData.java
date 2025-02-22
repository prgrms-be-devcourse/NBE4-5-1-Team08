package com.java.NBE4_5_1_8.global.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RsData<T> {
    private HttpStatus status;
    private boolean success;
    private String message;
    private T data;

    public static <T> RsData<T> success(HttpStatus status, String message) {
        return new RsData<>(status, true, message, null);
    }

    public static <T> RsData<T> success(HttpStatus status, T data, String message) {
        return new RsData<>(status, true, message, data);
    }

    public static <T> RsData<T> failure(HttpStatus status, String message) {
        return new RsData<>(status, false, message, null);
    }

}
