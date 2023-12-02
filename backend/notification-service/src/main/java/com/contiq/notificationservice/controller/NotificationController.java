package com.contiq.notificationservice.controller;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.NotificationDtoRequestList;
import com.contiq.notificationservice.dto.NotificationListResponseDto;
import com.contiq.notificationservice.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{usrId}")
    public ResponseEntity<NotificationListResponseDto> findById(@PathVariable String usrId) {
        List<NotificationDto> notifications = notificationService.findNotificationsById(usrId);
        NotificationListResponseDto response = new NotificationListResponseDto();
        response.setNotifications(notifications);
        response.setMessage("Notifications retrieved successfully.");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PostMapping
    public ResponseEntity<NotificationListResponseDto> newNotification(@RequestBody NotificationDtoRequestList notificationDtoRequestList) {
        List<NotificationDto> newNotificationInfo = notificationService.saveNotification(notificationDtoRequestList);
        return ResponseEntity.status(HttpStatus.CREATED).body(new NotificationListResponseDto(newNotificationInfo, "Notifications saved successfully." ));
    }


    @PatchMapping("/{notificationId}")
    public ResponseEntity<NotificationDto> updateNotification(@PathVariable String notificationId, @RequestBody NotificationDto notificationDto) {
        NotificationDto updatedNotificationInfo = notificationService.updateNotification(notificationId, notificationDto);
        return ResponseEntity.status(HttpStatus.OK).body(updatedNotificationInfo);
    }


}
