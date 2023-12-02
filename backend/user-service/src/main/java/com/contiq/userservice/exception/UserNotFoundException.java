package com.contiq.userservice.exception;

public class UserNotFoundException  extends RuntimeException{
    public UserNotFoundException(String message){
        super(message);
    }
}
