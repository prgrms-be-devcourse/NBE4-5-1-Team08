package com.java.NBE4_5_1_8.global.exception;


import com.java.NBE4_5_1_8.global.response.RsData;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public RsData<Void> ServiceExceptionHandle(ServiceException ex) {

//        // 개발 모드에서만 작동되도록.
//        if (AppConfig.isNotProd()) ex.printStackTrace();

        return RsData.failure(ex.getMsg());
    }


}
