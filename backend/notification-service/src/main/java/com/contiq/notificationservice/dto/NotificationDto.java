package com.contiq.notificationservice.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private String notificationId;
    private String action;
    private boolean isRead;
    private String fileId;
    private String usrId;
    private String createdBy;
    private Timestamp createdOn;
    private Timestamp updatedOn;
}
