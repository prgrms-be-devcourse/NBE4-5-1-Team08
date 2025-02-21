package com.java.NBE4_5_1_8.global.exception;


import com.java.NBE4_5_1_8.global.response.RsData;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public RsData<Void> ServiceExceptionHandle(ServiceException ex) {

        ex.printStackTrace();

        return RsData.failure(ex.getMsg());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public RsData<Void> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        e.printStackTrace();

        String message = e.getBindingResult().getFieldErrors()
                .stream()
                .map(fe -> fe.getField() + " : " + fe.getCode() + " : " + fe.getDefaultMessage())
                .sorted()
                .collect(Collectors.joining("\n"));

        return RsData.failure(message);
    }


}
