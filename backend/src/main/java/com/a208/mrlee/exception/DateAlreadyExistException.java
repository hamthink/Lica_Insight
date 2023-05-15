package com.a208.mrlee.exception;

public class DateAlreadyExistException extends RuntimeException{

    public DateAlreadyExistException(){
        super();
    }
    public DateAlreadyExistException(String message){
        super(message);
    }
}
