package com.contiq.userservice.service;

import com.contiq.userservice.dto.request.AuthRequest;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.request.ValidationRequestDto;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exception.InvalidCredentialsException;
import com.contiq.userservice.exception.UserCreateException;
import com.contiq.userservice.exception.UserNotFoundException;
import com.contiq.userservice.repository.UserRepository;
import com.contiq.userservice.service.impl.JwtGeneratorImpl;
import com.contiq.userservice.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private JwtGeneratorImpl jwtGenerator;
    private BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUsers() {
        String email = "user@example.com";
        User user = new User();
        user.setId("1");
        user.setEmail(email);
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        List<UserResponse> result = userService.getUsers(email,null);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(user.getId(), result.get(0).getId());
        assertEquals(email, result.get(0).getEmail());
        verify(userRepository, times(1)).findByEmail(email);
    }
    @Test
    void testGetUsersWithEmailEmpty() {
        String email = "";
        List<UserResponse> result = userService.getUsers(email, null);
        assertTrue(result.isEmpty());
    }
    @Test
    void testGetUsersWithEmailNull() {
        String email = null;
        List<UserResponse> result = userService.getUsers(email, null);
        assertTrue(result.isEmpty());
    }
    @Test
    void testGetAllUsers() {
        List<User> users = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            User user = new User();
            user.setId(String.valueOf(i));
            user.setEmail("user" + i + "@example.com");
            users.add(user);
        }
        when(userRepository.findAll()).thenReturn(users);
        List<UserResponse> result = userService.getUsers(null, null);
        assertNotNull(result);
        assertEquals(users.size(), result.size());
        for (int i = 0; i < users.size(); i++) {
            UserResponse userResponse = result.get(i);
            User user = users.get(i);
            assertEquals(user.getId(), userResponse.getId());
            assertEquals(user.getEmail(), userResponse.getEmail());
        }
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUsersByEmailIds() {
        List<String> emailIds = List.of("1", "2", "3");
        List<User> users = new ArrayList<>();
        for (String emailId : emailIds) {
            User user = new User();
            user.setId(emailId);
            user.setEmail("user" + emailId + "@example.com");
            users.add(user);
        }
        when(userRepository.findAllById(emailIds)).thenReturn(users);
        List<UserResponse> result = userService.getUsers(null, emailIds);
        assert (result.size() == emailIds.size());
        for (int i = 0; i < emailIds.size(); i++) {
            UserResponse userResponse = result.get(i);
            User user = users.get(i);
            assert (userResponse.getId().equals(user.getId()));
            assert (userResponse.getEmail().equals(user.getEmail()));
        }
        verify(userRepository, times(1)).findAllById(emailIds);
    }

    @Test
    void testGetUsersWithEmailIdsEmpty() {
        List<String> emailIds = Arrays.asList();
        String email = "";
        List<UserResponse> result = userService.getUsers(email, emailIds);
        assertTrue(result.isEmpty());
    }

    @Test
    void testGetUsersWithEmailIdsNull() {
        List<String> emailIds = null;
        List<UserResponse> result = userService.getUsers(null, emailIds);
        assertTrue(result.isEmpty());
    }
      @Test
      void testGetUsersByEmailNotFound() {
        String email = "user@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUsers(email,null);
        });
        verify(userRepository, times(1)).findByEmail(email);
       }

      @Test
       void testSaveUser() {
        UserRequest userRequest = new UserRequest("John", "Doe","john@example.com","password123","avatar.jpg");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User savedUser = invocation.getArgument(0);
            savedUser.setId("1");
            return savedUser;
        });
        UserResponse savedUserResponse = userService.saveUser(userRequest);
        assertNotNull(savedUserResponse);
        assertEquals("John", savedUserResponse.getFirstName());
    }
    @Test
    void testSaveUser_PostException() {
        UserRequest userRequest = new UserRequest("John", "Doe","john@example.com","password123","avatar.jpg");
        when(userRepository.save(any(User.class))).thenThrow(new RuntimeException(" saveUser Test case failure"));
        assertThrows(UserCreateException.class, () -> userService.saveUser(userRequest));
    }

    @Test
    void testGetUserById() {
        String userId="1";
        User user = new User();
        user.setId(userId);
        user.setPassword("password");
        user.setEmail("john@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setAvatarUrl("Avatar1.jpg");
        user.setCreatedOn(new Date());
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        UserResponse userResponse = userService.getUserById(userId);
        assertNotNull(userResponse);
        assertEquals("John", userResponse.getFirstName());
    }

    @Test
    void testGetUserById_UserNotFoundException() {
        String userId = "999";
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void testUpdateUserPassword() {
        String email = "test@example.com";
        UserRequest userRequest = new UserRequest("John", "Doe", "john@example.com", "newPassword", "avatar.jpg");

        User user = new User();
        user.setId("1");
        user.setPassword("password");
        user.setEmail("john@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setAvatarUrl("Avatar1.jpg");
        user.setCreatedOn(new Date());
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));
        UserResponse updatedUserResponse = userService.updateUserPassword(email, userRequest);
        assertNotNull(updatedUserResponse);
        assertEquals("John", updatedUserResponse.getFirstName());
        verify(userRepository).findByEmail(email);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testUpdateUserPassword_UserNotFoundException() {
        String userId = "999";
        UserRequest userRequest = new UserRequest("John", "Doe","john@example.com","password123","avatar.jpg");
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.updateUserPassword(userId, userRequest));
    }

    @Test
    void testGetUser_ValidCredentials() {
        AuthRequest authRequest = new AuthRequest("john@example.com", "password123");

        User user = new User();
        user.setId("1");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        user.setPassword(bcrypt.encode("password123"));

        when(userRepository.findByEmail(authRequest.getEmail())).thenReturn(Optional.of(user));

        UserResponse userResponse = userService.getUser(authRequest);

        assertNotNull(userResponse);
        assertEquals("1", userResponse.getId());
        assertEquals("john@example.com", userResponse.getEmail());
    }

    @Test
    void testGetUser_UserNotFound() {
        AuthRequest authRequest = new AuthRequest("john@example.com", "password123");

        when(userRepository.findByEmail(authRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUser(authRequest));
    }

    @Test
    void testGetUser_InvalidCredentials() {
        AuthRequest authRequest = new AuthRequest("john@example.com", "password123");
        User user = new User();
        user.setId("1");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        user.setPassword(bcrypt.encode("password1234"));
        when(userRepository.findByEmail(authRequest.getEmail())).thenReturn(Optional.of(user));
        assertThrows(InvalidCredentialsException.class, () -> userService.getUser(authRequest));
    }

    @Test
    void testValidate_NullValues() {
        ValidationRequestDto validationRequestDto = new ValidationRequestDto(null, null);
        boolean isValid = userService.validate(validationRequestDto);
        assertFalse(isValid);
    }

    @Test
    void testValidate_WithToken() {
        String validToken = "validToken123";
        ValidationRequestDto validationRequestDto = new ValidationRequestDto(validToken, null);
        when(jwtGenerator.validateToken(validToken)).thenReturn(true);
        boolean isValid = userService.validate(validationRequestDto);
        assertTrue(isValid);
        verify(jwtGenerator).validateToken(validToken);

    }

    @Test
    void testValidate_UserByEmailFound() {
        // Given
        String userEmail = "test@example.com";
        ValidationRequestDto validationRequestDto = new ValidationRequestDto(null, userEmail);
        User user = new User();
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));
        boolean isValid = userService.validate(validationRequestDto);
        assertTrue(isValid);
        verify(userRepository).findByEmail(userEmail);
    }

    @Test
    void testValidate_UserByEmailNotFound() {
        ValidationRequestDto validationRequestDto = new ValidationRequestDto(null, "nonexistent@example.com");

        assertThrows(UserNotFoundException.class, () -> {
            userService.validate(validationRequestDto);
        });

    }


}
