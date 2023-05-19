package com.a208.mrlee.exception;

public class UniqueConstraintViolationException extends RuntimeException{

    public UniqueConstraintViolationException(){
        super();
    }
    public UniqueConstraintViolationException(String message){
        super(message);
    }
}
