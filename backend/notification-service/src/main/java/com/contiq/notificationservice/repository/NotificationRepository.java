package com.contiq.notificationservice.repository;

import com.contiq.notificationservice.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,String> {
    List<Notification> findAllByUsrId(String usrId);

}
