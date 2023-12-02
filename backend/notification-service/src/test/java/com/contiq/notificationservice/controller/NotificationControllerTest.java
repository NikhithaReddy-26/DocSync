package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.NotificationDtoRequestList;
import com.contiq.notificationservice.dto.NotificationListResponseDto;
import com.contiq.notificationservice.service.NotificationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class NotificationControllerTest {

    @InjectMocks
    private NotificationController notificationController;

    @Mock
    private NotificationService notificationService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testFindById() {
        String usrId = "user123";
        List<NotificationDto> notifications = new ArrayList<>();
        NotificationListResponseDto expectedResponse = new NotificationListResponseDto();
        expectedResponse.setNotifications(notifications);
        expectedResponse.setMessage("Notifications retrieved successfully");
        when(notificationService.findNotificationsById(usrId)).thenReturn(notifications);
        ResponseEntity<NotificationListResponseDto> responseEntity = notificationController.findById(usrId);
        verify(notificationService, times(1)).findNotificationsById(usrId);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

    }

    @Test
    void testNewNotification() {
        NotificationDto notificationDto = new NotificationDto();
        List<NotificationDto> expectedResponseDto = Arrays.asList(notificationDto);
        NotificationDtoRequestList requestList = new NotificationDtoRequestList(Arrays.asList(notificationDto));
        when(notificationService.saveNotification(requestList))
                .thenReturn(expectedResponseDto);

        ResponseEntity<NotificationListResponseDto> response = notificationController.newNotification(new NotificationDtoRequestList(Arrays.asList(notificationDto)));

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        verify(notificationService, times(1)).saveNotification(requestList);
    }



    @Test
    void testUpdateNotification() {
        String notificationId = "notification123";
        NotificationDto notificationDto = new NotificationDto();
        NotificationDto expectedResponseDto = new NotificationDto();
        when(notificationService.updateNotification(notificationId, notificationDto)).thenReturn(expectedResponseDto);

        ResponseEntity<NotificationDto> response = notificationController.updateNotification(notificationId, notificationDto);

        verify(notificationService, times(1)).updateNotification(notificationId, notificationDto);

        assertEquals(HttpStatus.OK, response.getStatusCode());

        assertEquals(expectedResponseDto, response.getBody());
    }

}
