package com.java.NBE4_5_1_8.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RsData<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ResponseEntity<RsData<T>> success(HttpStatus status, T data, String message) {
        return ResponseEntity
                .status(status)
                .body(new RsData<>(true, message, data));
    }

    public static <T> ResponseEntity<RsData<T>> failure(HttpStatus status, String message) {
        return ResponseEntity
                .status(status)
                .body(new RsData<>(false,  message, null));
    }

}
