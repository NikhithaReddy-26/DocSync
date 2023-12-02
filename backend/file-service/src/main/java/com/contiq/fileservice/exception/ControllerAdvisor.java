package com.contiq.fileservice.exception;

import com.contiq.fileservice.constant.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<Object> handleFileNotFoundException(FileNotFoundException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put(Constant.TIMESTAMP_STRING, LocalDateTime.now());
        body.put(Constant.MESSAGE_STRING, ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FileNotSupportedException.class)
    public ResponseEntity<Object> handleFileNotSupportedException(FileNotSupportedException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put(Constant.TIMESTAMP_STRING, LocalDateTime.now());
        body.put(Constant.MESSAGE_STRING, ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ParseDataException.class)
    public ResponseEntity<Object> handleParseDataException(ParseDataException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put(Constant.TIMESTAMP_STRING, LocalDateTime.now());
        body.put(Constant.MESSAGE_STRING, ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UserIdNotProvidedException.class)
    public ResponseEntity<Object> handleUserIdNotProvidedException(UserIdNotProvidedException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put(Constant.TIMESTAMP_STRING, LocalDateTime.now());
        body.put(Constant.MESSAGE_STRING, ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RepositoryOperationException.class)
    public ResponseEntity<Object> handleRepositoryOperationException(RepositoryOperationException ex, WebRequest request) {
        Map<String, Object> body = new HashMap<>();
        body.put(Constant.TIMESTAMP_STRING, LocalDateTime.now());
        body.put(Constant.MESSAGE_STRING, ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
