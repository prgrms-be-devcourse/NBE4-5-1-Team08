package com.java.NBE4_5_1_8.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.java.NBE4_5_1_8.global.message.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RsData<T> {
    private HttpStatus status;
    private boolean success;
    @Getter
    private MessageType message;
    private T data;

    public static <T> RsData<T> success(HttpStatus status, MessageType message) {
        return new RsData<>(status, true, message, null);
    }

    public static <T> RsData<T> success(HttpStatus status, T data, MessageType message) {
        return new RsData<>(status, true, message, data);
    }

    public static <T> RsData<T> failure(HttpStatus status, MessageType message) {
        return new RsData<>(status, false, message, null);
    }

}
