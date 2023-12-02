package com.contiq.userservice.service;

import com.contiq.userservice.dto.request.AuthRequest;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.request.ValidationRequestDto;
import com.contiq.userservice.dto.response.UserResponse;

import java.util.List;


public interface UserService {
    List<UserResponse> getUsers(String email,List<String>emailIds);
    UserResponse saveUser(UserRequest userRequest);
    UserResponse getUserById(String userId);
    UserResponse updateUserPassword(String email,UserRequest userRequest);
    boolean validate(ValidationRequestDto validationRequestDto);
    UserResponse getUser(AuthRequest authRequest);
}
