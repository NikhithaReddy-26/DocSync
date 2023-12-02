package com.contiq.notificationservice.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @UuidGenerator
    @Column(name="notification_id")
    private String notificationId;
    @Column(name="action")
    private String action;

    @Column(name = "is_read")
    private boolean isRead;

    @Column(name = "file_id")
    private String fileId;

    @Column(name = "usr_id")
    private String usrId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_on")
    private Timestamp createdOn;

    @Column(name = "updated_on")
    private Timestamp updatedOn;


}
