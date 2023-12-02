package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileResponseDto {

    private String fileId;
    private String fileName;
    private String fileType;
    private String filePath;
    private String userId;
    private boolean trashed;
    private boolean synced;
    private Date createdOn;
    private Date updatedOn;
    private String content;
}
