package com.contiq.fileservice.exception;

import com.contiq.fileservice.constant.Constant;

public class FileNotSupportedException extends RuntimeException {

    public FileNotSupportedException(String extension){
        super(String.format(Constant.FILE_NOT_SUPPORTED, extension));
    }
}
