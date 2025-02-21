package com.java.NBE4_5_1_8.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ServiceException extends RuntimeException {

    private final HttpStatus status;
    private final String message;

    public ServiceException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.message = message;
    }

}