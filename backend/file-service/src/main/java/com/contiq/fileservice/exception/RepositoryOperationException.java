package com.contiq.fileservice.exception;

import com.contiq.fileservice.constant.Constant;

public class RepositoryOperationException extends RuntimeException{
    public RepositoryOperationException(String operation){
        super(String.format(Constant.REPOSITORY_OPERATION_ERROR, operation));
    }
}