package com.contiq.notificationservice.exception;

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
    void testHandleNotificationNotFoundException() {
        NotificationNotFoundException ex = new NotificationNotFoundException("Notification not found with id: 123");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handleNotificationNotFound(ex);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(responseBody);
        assertEquals("Notification not found with id: 123", responseBody.get("message"));
        assertNotNull(responseBody.get("timestamp"));
    }
    @Test
    void testHandlePostException() {
        NotificationPostException ex = new NotificationPostException("Notification cannot be posted: Database error");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handlePostException(ex);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(responseBody);
        assertEquals("Notification cannot be posted: Database error", responseBody.get("message"));
        assertNotNull(responseBody.get("timestamp"));
    }
    @Test
    void testHandleGenericException() {
        Exception ex = new Exception("Generic error");
        ResponseEntity<Object> responseEntity = globalExceptionHandler.handleGenericException(ex);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }
}
