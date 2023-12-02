package com.contiq.userservice.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class GlobalExceptionTest {
    private GlobalExceptionHandler globalExceptionHandler;
    @BeforeEach
    public void setup() {
        globalExceptionHandler = new GlobalExceptionHandler();
    }
    @Test
    void testHandleUserNotFoundException() {
        UserNotFoundException ex = new UserNotFoundException("User not found with id: 123");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handleTransactionNotFound(ex);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(responseBody);
        assertEquals("User not found with id: 123", responseBody.get("message"));
        assertNotNull(responseBody.get("timestamp"));
    }
    @Test
    void testHandlePostException() {
        UserCreateException ex = new UserCreateException("User cannot be saved: Database error");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handlePostException(ex);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(responseBody);
        assertEquals("User cannot be saved: Database error", responseBody.get("message"));
        assertNotNull(responseBody.get("timestamp"));
    }
    @Test
    void testHandleInvalidCredentialsException() {
        InvalidCredentialsException exception = new InvalidCredentialsException("Invalid credentials");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handleInvalidCredentialsException(exception);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        Map<String, Object> expectedResponseBody = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(expectedResponseBody);
        assertEquals("Invalid credentials", expectedResponseBody.get("message"));
    }
    @Test
    void testHandleGenericException() {
        Exception ex = new Exception("Generic error");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handleGenericException(ex);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }
}
