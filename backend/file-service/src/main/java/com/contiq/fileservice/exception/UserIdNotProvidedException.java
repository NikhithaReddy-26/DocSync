package com.contiq.fileservice.exception;

import com.contiq.fileservice.constant.Constant;

public class UserIdNotProvidedException extends RuntimeException {
    public UserIdNotProvidedException () {
        super(Constant.USER_ID_NOT_PROVIDED);
    }
}
