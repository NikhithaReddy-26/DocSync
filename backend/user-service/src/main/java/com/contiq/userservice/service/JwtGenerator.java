package com.contiq.userservice.service;

import com.contiq.userservice.dto.response.UserResponse;

import java.util.Map;

public interface JwtGenerator {
    Map<String, String> generateToken(UserResponse userResponse);
}
