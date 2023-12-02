package com.contiq.fileservice.exception;

import com.contiq.fileservice.constant.Constant;

public class FileNotFoundException extends RuntimeException {

    public FileNotFoundException(String fileId){
        super(String.format(Constant.FILE_NOT_FOUND, fileId));
    }
}
