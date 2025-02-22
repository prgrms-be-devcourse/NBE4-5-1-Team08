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
    private String code;
    private boolean success;
    private String message;
    private T data;

    public static <T> RsData<T> success(String code, String message) {
        return new RsData<>(code, true, message, null);
    }

    public static <T> RsData<T> success(String code, T data, String message) {
        return new RsData<>(code, true, message, data);
    }

    public static <T> RsData<T> failure(String code, String message) {
        return new RsData<>(code, false, message, null);
    }

    @JsonIgnore
    public int getStatusCode() {
        return Integer.parseInt(code);
    }

}
