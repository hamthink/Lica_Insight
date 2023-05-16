package com.a208.mrlee.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private final int code;
    private final String message;
    private String cause;
    private String path;

    @Builder
    public ErrorResponse(int code, String message, String cause, String path){
        this.code = code;
        this.message = message;
        this.cause = cause;
        this.path = path;
    }
}
