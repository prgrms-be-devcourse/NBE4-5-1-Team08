package com.java.NBE4_5_1_8.global.exception;

import com.java.NBE4_5_1_8.global.response.RsData;

public class ServiceException extends RuntimeException {

    private RsData<?> rsData;

    public ServiceException(String message) {
        super(message);
        rsData = RsData.failure(message);
    }

    public String getMsg() {
        return rsData.getMessage();
    }

}
