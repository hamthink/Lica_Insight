package com.a208.mrlee.exception;

import com.a208.mrlee.exception.ErrorResponse;
import com.a208.mrlee.exception.UniqueConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.NoSuchElementException;

@RestControllerAdvice(basePackages = "com.a208.mrlee.controller")
public class GlobalExceptionHandler {

    final int BAD_REQUEST = HttpStatus.BAD_REQUEST.value(); // 400
    final int NOT_FOUND = HttpStatus.NOT_FOUND.value(); // 404
    final int INTERNAL_SERVER_ERROR = HttpStatus.INTERNAL_SERVER_ERROR.value(); // 500

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex,
            HttpServletRequest req) {

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.builder()
                        .code(BAD_REQUEST)
                        .message(ex.getMessage())
                        .path(req.getRequestURL().toString())
                        .build()
                );
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ErrorResponse> handleNoSuchElementException(
            NoSuchElementException ex,
            HttpServletRequest req) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponse
                        .builder()
                        .code(NOT_FOUND)
                        .message(ex.getMessage())
                        .path(req.getRequestURL().toString())
                        .build()
                );
    }

    @ExceptionHandler(UniqueConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleUniqueConstraintViolationException(
            UniqueConstraintViolationException ex,
            HttpServletRequest req) {

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse
                        .builder()
                        .code(INTERNAL_SERVER_ERROR)
                        .message(ex.getMessage())
                        .path(req.getRequestURL().toString())
                        .build());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(
            RuntimeException ex,
            HttpServletRequest req
    ){

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponse
                        .builder()
                        .code(INTERNAL_SERVER_ERROR)
                        .message(ex.getMessage())
                        .path(req.getRequestURL().toString())
                        .stackTrace(ex.getStackTrace().toString())
                        .build());
    }
}
