package com.contiq.userservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private UserResponse user;
    private Map<String, String> token;
}
