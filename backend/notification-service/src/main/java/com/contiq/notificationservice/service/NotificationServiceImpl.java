package com.contiq.notificationservice.service;

import com.contiq.notificationservice.dto.NotificationDto;
import com.contiq.notificationservice.dto.NotificationDtoRequestList;
import com.contiq.notificationservice.entity.Notification;
import com.contiq.notificationservice.exception.NotificationNotFoundException;
import com.contiq.notificationservice.exception.NotificationPostException;
import com.contiq.notificationservice.repository.NotificationRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public List<NotificationDto> findNotificationsById(String usrId) {
        List<Notification> notificationList = notificationRepository.findAllByUsrId(usrId);
        if (notificationList.isEmpty()) {
            throw new NotificationNotFoundException("User with ID " + usrId + " not found");
        }
        notificationList.sort(Comparator.comparing(Notification::getCreatedOn).reversed());
        return notificationList.stream().map(this::entityToDto).toList();

    }
    @Override
    public List<NotificationDto> saveNotification(NotificationDtoRequestList notificationDtoRequestList) {
        try {
            List<Notification> newNotification = notificationDtoRequestList.getNotifications().stream().map(this::dtoToEntity).toList();
            newNotification = notificationRepository.saveAll(newNotification);
            return newNotification.stream().map(this::entityToDto).toList();
        } catch (Exception ex) {
            log.error("Error while creating a new notification: {}", ex.getMessage());
            throw new NotificationPostException("Failed to create a new notification");
        }
    }


    @Override
    public NotificationDto updateNotification(String notificationId, NotificationDto notificationDto) {
        Notification existingNotification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException("Notification not found with id:" + notificationId));

        existingNotification.setRead(notificationDto.isRead());
        existingNotification.setUpdatedOn(Timestamp.valueOf(LocalDateTime.now()));

        Notification updatedNotification = notificationRepository.save(existingNotification);

        return entityToDto(updatedNotification);
    }



    public NotificationDto entityToDto (Notification notification){
        return modelMapper.map(notification, NotificationDto.class);
    }
    public Notification dtoToEntity(NotificationDto notificationDto){
        return modelMapper.map(notificationDto, Notification.class);
    }
}
