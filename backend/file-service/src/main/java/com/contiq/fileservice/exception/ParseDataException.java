package com.contiq.fileservice.exception;

import com.contiq.fileservice.constant.Constant;

public class ParseDataException extends RuntimeException {

    public ParseDataException(String fileName) {
        super(String.format(Constant.PARSE_DATA_ERROR, fileName));
    }

}
