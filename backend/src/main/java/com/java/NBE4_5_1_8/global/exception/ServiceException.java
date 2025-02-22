package com.java.NBE4_5_1_8.global.exception;

import com.java.NBE4_5_1_8.global.response.RsData;
import lombok.Getter;

@Getter
public class ServiceException extends RuntimeException {

    private RsData<?> rsData;

    public ServiceException(String code, String message) {
        super(message);
        rsData = RsData.failure(code, message);
    }

    public String getCode() {
        return rsData.getCode();
    }

    public String getMessage() {
        return rsData.getMessage();
    }

    public int getStatusCode() {
        return rsData.getStatusCode();
    }

}