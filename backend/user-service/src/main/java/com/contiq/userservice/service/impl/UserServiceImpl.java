package com.contiq.userservice.service.impl;

import com.contiq.userservice.dto.request.AuthRequest;
import com.contiq.userservice.dto.request.UserRequest;
import com.contiq.userservice.dto.request.ValidationRequestDto;
import com.contiq.userservice.dto.response.UserResponse;
import com.contiq.userservice.entity.User;
import com.contiq.userservice.exception.InvalidCredentialsException;
import com.contiq.userservice.exception.UserCreateException;
import com.contiq.userservice.exception.UserNotFoundException;
import com.contiq.userservice.repository.UserRepository;
import com.contiq.userservice.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.contiq.userservice.constant.Constant.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    private ModelMapper modelMapper;
    @Autowired
    JwtGeneratorImpl jwtGenerator;
    public UserServiceImpl() {
        modelMapper = new ModelMapper();
    }
    @Override
    public List<UserResponse> getUsers(String email,List<String>emailIds) {
        if (email != null && !email.isEmpty()) {
            log.info("email");
            UserResponse userResponse = modelMapper.map(userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_EMAIL + email)), UserResponse.class);
            return Arrays.asList(userResponse);
        } else if (emailIds != null && !emailIds.isEmpty()) {
            List<User> users = userRepository.findAllById(emailIds);
            return users.stream().map(user -> modelMapper.map(user, UserResponse.class)).toList();
        } else {
            List<User> allUsers = userRepository.findAll();
            return allUsers.stream().map(user -> modelMapper.map(user, UserResponse.class)).toList();
        }
    }

    @Override
    public UserResponse saveUser(UserRequest userRequest) {
      try {
          log.info("user is ",userRequest);
          BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
          String bcryptEncodedPassword = bcrypt.encode(userRequest.getPassword());
          userRequest.setPassword(bcryptEncodedPassword);
          User user = modelMapper.map(userRequest, User.class);
          User newUser = userRepository.save(user);
          log.info("user added successfully");
          return modelMapper.map(newUser, UserResponse.class);
      }
      catch(Exception exception){
          throw new UserCreateException(USER_NOT_SAVED +exception.getMessage());
      }
    }

    @Override
    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new UserNotFoundException(USER_NOT_FOUND + userId)
        );
        return modelMapper.map(user, UserResponse.class);
    }


    @Override
    public UserResponse updateUserPassword(String email,UserRequest userRequest) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException(USER_NOT_FOUND + email));
        BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
        String bcryptEncodedPassword= bcrypt.encode(userRequest.getPassword());
        user.setPassword(bcryptEncodedPassword);
        User updatedUser=userRepository.save(user);
        log.info("user updated successfully");
        return modelMapper.map(updatedUser,UserResponse.class);
    }
    public boolean validate(ValidationRequestDto validationRequestDto) {
        if (Objects.nonNull(validationRequestDto.getToken())){
            return jwtGenerator.validateToken(validationRequestDto.getToken());
        } else {
            User user = Objects.nonNull(validationRequestDto.getEmail())
                    ? userRepository.findByEmail(validationRequestDto.getEmail()).orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_EMAIL))
                    : null;
            return Objects.nonNull(user);
        }
    }

    @Override
    public UserResponse getUser(AuthRequest authRequest) {
        try {
            User userDetail = userRepository.findByEmail(authRequest.getEmail()).orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_EMAIL + authRequest.getEmail()));
            BCryptPasswordEncoder bcrypt=new BCryptPasswordEncoder();
            boolean passwordMatches=bcrypt.matches(authRequest.getPassword(), userDetail.getPassword());
            if (passwordMatches) {
                UserResponse userDto = new UserResponse();
                userDto.setId(userDetail.getId());
                userDto.setEmail(userDetail.getEmail());
                userDto.setFirstName(userDetail.getFirstName());
                userDto.setLastName(userDetail.getLastName());
                userDto.setAvatarUrl(userDetail.getAvatarUrl());
                userDto.setCreatedOn(userDetail.getCreatedOn());
                return userDto;
                }
                else {
                    throw new InvalidCredentialsException("Invalid password");
                }
            }
          catch (UserNotFoundException e) {
            throw new UserNotFoundException("User Not Found");
           }
          catch (InvalidCredentialsException e){
            throw new InvalidCredentialsException("Invalid password");
          }
    }

}
