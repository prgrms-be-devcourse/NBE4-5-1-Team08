package com.java.NBE4_5_1_8.global.exception;

import com.java.NBE4_5_1_8.global.response.RsData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<RsData<?>> ServiceExceptionHandle(ServiceException e) {

        e.printStackTrace();

        return ResponseEntity
                .status(e.getStatusCode())
                .body(
                        RsData.failure(
                                e.getStatusCode(),
                                e.getErrorMessage()
                        )
                );

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RsData<Void>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        e.printStackTrace();

        String message = e.getBindingResult().getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField() + " : " + fieldError.getCode() + " : " + fieldError.getDefaultMessage())
                .sorted()
                .collect(Collectors.joining("\n"));

        return ResponseEntity
                .status(e.getStatusCode())
                .body(
                        RsData.failure(
                                HttpStatus.BAD_REQUEST,
                                () -> message
                        )
                );
    }
}
