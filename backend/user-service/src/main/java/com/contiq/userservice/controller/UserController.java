package com.contiq.userservice.controller;


import com.contiq.userservice.dto.request.AuthRequest;
import com.contiq.userservice.dto.request.ValidationRequestDto;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserList;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.dto.response.UserResponseDto;
import com.contiq.userservice.service.JwtGenerator;
import com.contiq.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtGenerator jwtGenerator;

    @GetMapping
    public ResponseEntity<UserList> getUsers(@RequestParam(name = "email", required = false) String email,@RequestParam(name = "emailIds", required = false) List<String> emailIds){
        List<UserResponse> users=userService.getUsers(email,emailIds);
        UserList userList= new UserList();
        userList.setUsers(users);
        userList.setStatus("success");
        return ResponseEntity.ok(userList);
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> saveUser(@RequestBody UserRequest userRequest){
        return new ResponseEntity<>(userService.saveUser(userRequest), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody AuthRequest authRequest){
            UserResponse userResponse= userService.getUser(authRequest);
            Map<String,String> token= jwtGenerator.generateToken(userResponse);
            UserResponseDto responseDto= new UserResponseDto();
            responseDto.setUser(userResponse);
            responseDto.setToken(token);
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String userId){
        UserResponse user=userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
    @PostMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestBody ValidationRequestDto validationRequestDto) {
        boolean isValid=userService.validate(validationRequestDto);
        if (isValid){
            return new ResponseEntity<>("Valid Request",HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Invalid Request",HttpStatus.NOT_FOUND);
        }
    }
    @PatchMapping("/email/{email}")
    public ResponseEntity<UserResponse> updateUserPassword(@PathVariable String email,@RequestBody UserRequest userRequest){
    UserResponse updatedUser=userService.updateUserPassword(email,userRequest);
    return new ResponseEntity<>(updatedUser,HttpStatus.OK);
    }
}
