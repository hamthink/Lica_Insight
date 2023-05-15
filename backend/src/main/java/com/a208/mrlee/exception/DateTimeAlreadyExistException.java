package com.a208.mrlee.exception;

public class DateTimeAlreadyExistException extends RuntimeException{

    public DateTimeAlreadyExistException(){

        super();
    }

    public DateTimeAlreadyExistException(String message){

        super(message);
    }
}
