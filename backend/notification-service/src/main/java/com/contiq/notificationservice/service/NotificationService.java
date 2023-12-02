package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.NotificationDtoRequestList;

import java.util.List;

public interface NotificationService {
    List<NotificationDto> saveNotification(NotificationDtoRequestList notificationDtoRequestList);

    NotificationDto updateNotification(String notificationId, NotificationDto notificationDto);

    List<NotificationDto> findNotificationsById(String usrId);
}
