package com.java.NBE4_5_1_8.global.exception;

import com.java.NBE4_5_1_8.global.message.MessageType;
import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ServiceException extends RuntimeException {

    private RsData<?> rsData;

    public ServiceException(HttpStatus status, MessageType message) {
        super(message.getMessage());
        rsData = RsData.failure(status, message);
    }

    public MessageType getErrorMessage() {
        return rsData.getMessage();
    }

    public HttpStatus getStatusCode() {
        return rsData.getStatus();
    }

}