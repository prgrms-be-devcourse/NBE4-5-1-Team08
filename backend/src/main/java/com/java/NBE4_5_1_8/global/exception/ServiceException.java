package com.java.NBE4_5_1_8.global.exception;

import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ServiceException extends RuntimeException {

    private RsData<?> rsData;

    public ServiceException(HttpStatus status, String message) {
        super(message);
        rsData = RsData.failure(status, message);
    }

    public String getMessage() {
        return rsData.getMessage();
    }

    public HttpStatus getStatusCode() {
        return rsData.getStatus();
    }

}