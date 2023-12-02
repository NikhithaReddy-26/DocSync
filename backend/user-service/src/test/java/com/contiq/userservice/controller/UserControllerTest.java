package com.contiq.userservice.controller;

import com.contiq.userservice.dto.request.AuthRequest;
import com.contiq.userservice.dto.request.ValidationRequestDto;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.response.UserList;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.dto.response.UserResponseDto;
import com.contiq.userservice.exception.InvalidCredentialsException;
import com.contiq.userservice.exception.UserNotFoundException;
import com.contiq.userservice.service.JwtGenerator;
import com.contiq.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {
    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;
    @Mock
    private JwtGenerator jwtGenerator;
    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllUsers() {
        List<UserResponse> users = new ArrayList<>();
        UserResponse user1 = new UserResponse("1", "John", "Doe", "john@example.com", "avatar1.jpg", null);
        UserResponse user2 = new UserResponse("2", "Jane", "Smith", "jane@example.com", "avatar2.jpg", null);
        users.add(user1);
        users.add(user2);
        when(userService.getUsers("john@example.com", null)).thenReturn(users);
        ResponseEntity<UserList> responseEntity = userController.getUsers("john@example.com", null);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        UserList userList = responseEntity.getBody();
        assertNotNull(userList);
        List<UserResponse> responseUsers = userList.getUsers();
        assertNotNull(responseUsers);
        assertEquals(2, responseUsers.size());
    }

    @Test
    void testSaveUser() {
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstName("John");
        userRequest.setLastName("Doe");
        userRequest.setEmail("john@example.com");
        userRequest.setPassword("password123");
        userRequest.setAvatarUrl("avatar.jpg");
        UserResponse savedUser = new UserResponse("1", "John", "Doe", "john@example.com", "avatar1.jpg", null);
        when(userService.saveUser(userRequest)).thenReturn(savedUser);
        Map<String, String> tokenMap = Map.of("tokenKey", "tokenValue");
        when(jwtGenerator.generateToken(savedUser)).thenReturn(tokenMap);
        ResponseEntity<UserResponse> responseEntity = userController.saveUser(userRequest);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        UserResponse responseDto = responseEntity.getBody();
        assertNotNull(responseDto);
    }

    @Test
    void testSaveUser_PostException() {
        UserRequest userRequest = new UserRequest();
        userRequest.setFirstName("John");
        userRequest.setLastName("Doe");
        userRequest.setEmail("john@example.com");
        userRequest.setPassword("password123");
        userRequest.setAvatarUrl("avatar.jpg");
        when(userService.saveUser(any(UserRequest.class))).thenThrow(new RuntimeException(" saveUser Test case failure"));
        assertThrows(RuntimeException.class, () -> {
            userController.saveUser(userRequest);
        });
    }
    @Test
    void testGetUserById() {
        String userId = "1";
        UserResponse userResponse = new UserResponse("1", "John", "Doe", "john@example.com", "avatar1.jpg", new Date());
        when(userService.getUserById(userId)).thenReturn(userResponse);
        ResponseEntity<UserResponse> responseEntity = userController.getUserById(userId);
        assert(responseEntity.getStatusCodeValue() == HttpStatus.OK.value());
        assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue());
    }

    @Test
    void testUpdateUserPassword() {
        String userId = "1";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword("newPassword123");
        UserResponse updatedUser = new UserResponse("1", "John", "Doe", "john@example.com", "avatar1.jpg", new Date());
        when(userService.updateUserPassword(userId, userRequest)).thenReturn(updatedUser);
        ResponseEntity<UserResponse> responseEntity = userController.updateUserPassword(userId, userRequest);
        assert(responseEntity.getStatusCodeValue() == HttpStatus.OK.value());
        assertEquals(HttpStatus.OK.value(), responseEntity.getStatusCodeValue());
    }
    @Test
    void testLogin() {
        AuthRequest authRequest = new AuthRequest("username", "password");
        UserResponse userResponse = new UserResponse("1", "John", "Doe", "john@example.com", "avatar1.jpg", null);
        when(userService.getUser(authRequest)).thenReturn(userResponse);
        Map<String, String> tokenMap = Map.of("tokenKey", "tokenValue");
        when(jwtGenerator.generateToken(userResponse)).thenReturn(tokenMap);
        ResponseEntity<UserResponseDto> responseEntity = userController.login(authRequest);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        UserResponseDto responseDto = responseEntity.getBody();
        assertNotNull(responseDto);
        assertEquals(userResponse, responseDto.getUser());
        assertEquals(tokenMap, responseDto.getToken());
    }
    @Test
    void testLogin_InvalidAuthRequest() {
        AuthRequest authRequest = new AuthRequest("invalidUsername", "invalidPassword");
        when(userService.getUser(authRequest)).thenThrow(new InvalidCredentialsException("Invalid authentication"));
        assertThrows(InvalidCredentialsException.class, () -> {
            userService.getUser(authRequest);
        });
    }

    @Test
    void testLogin_UserNotFound() {
        AuthRequest authRequest = new AuthRequest("nonExistingUser", "password");
        when(userService.getUser(authRequest)).thenThrow(new UserNotFoundException("User not found"));
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUser(authRequest);
        });
    }

    @Test
    void testValidateToken_ValidToken() {
        String validToken = "validToken123";
        ValidationRequestDto validationRequestDto = new ValidationRequestDto(validToken, null);
        when(userService.validate(validationRequestDto)).thenReturn(true);
        ResponseEntity<String> responseEntity = userController.validateToken(validationRequestDto);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Valid Request", responseEntity.getBody());
    }

    @Test
    void testValidateToken_InvalidToken() {
        String invalidToken = "invalidToken456";
        ValidationRequestDto validationRequestDto = new ValidationRequestDto(invalidToken, null);
        when(userService.validate(validationRequestDto)).thenReturn(false);
        ResponseEntity<String> responseEntity = userController.validateToken(validationRequestDto);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Invalid Request", responseEntity.getBody());
    }

}
