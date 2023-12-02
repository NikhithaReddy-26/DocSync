package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.NotificationDtoRequestList;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.exception.NotificationPostException;
import com.contiq.notificationservice.repository.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class NotificationServiceImplTest {

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private NotificationRepository notificationRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindNotificationsById() {
        String userId = "123";
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(new Notification());
        when(notificationRepository.findAllByUsrId(userId)).thenReturn(notificationList);
        List<NotificationDto> result = notificationService.findNotificationsById(userId);
        assertNotNull(result);
        assertEquals(notificationList.size(), result.size());
    }

    @Test
    void testFindNotificationsById_NotFound() {
        String userId = "123";
        when(notificationRepository.findAllByUsrId(userId)).thenReturn(new ArrayList<>());
        assertThrows(NotificationNotFoundException.class, () -> {
            notificationService.findNotificationsById(userId);
        });
    }

    @Test
    void testNewNotification() {
        NotificationDto notificationDto = new NotificationDto();
        Notification notification = new Notification();
        when(modelMapper.map(notificationDto, Notification.class)).thenReturn(notification);
        when(modelMapper.map(notification, NotificationDto.class)).thenReturn(notificationDto);
        List<NotificationDto> createdNotification = notificationService.saveNotification(new NotificationDtoRequestList(Arrays.asList(notificationDto)));
        verify(notificationRepository, times(1)).saveAll(Arrays.asList(notification));
    }


    @Test
    void testNewNotification_Exception() {
        NotificationDto notificationDto = new NotificationDto();
        when(modelMapper.map(notificationDto, Notification.class)).thenThrow(new RuntimeException());
        assertThrows(NotificationPostException.class, () -> {
            notificationService.saveNotification(new NotificationDtoRequestList(Arrays.asList(notificationDto)));
        });
    }

    @Test
    void testUpdateNotification() {
        String notificationId = "123";
        NotificationDto notificationDto = new NotificationDto();
        Notification existingNotification = new Notification();
        when(notificationRepository.findById(notificationId)).thenReturn(Optional.of(existingNotification));
        NotificationDto updatedNotification = notificationService.updateNotification(notificationId, notificationDto);
        verify(notificationRepository, times(1)).save(existingNotification);
    }


    @Test
    void testUpdateNotification_NotFound() {
        String notificationId = "123";
        NotificationDto notificationDto = new NotificationDto();
        when(notificationRepository.findById(notificationId)).thenReturn(Optional.empty());
        assertThrows(NotificationNotFoundException.class, () -> {
            notificationService.updateNotification(notificationId, notificationDto);
        });
    }
}
