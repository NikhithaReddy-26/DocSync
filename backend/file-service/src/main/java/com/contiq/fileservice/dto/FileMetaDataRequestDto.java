package com.contiq.fileservice.dto;

import com.contiq.fileservice.exception.ParseDataException;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FileMetaDataRequestDto {

    private String fileId;
    private String fileName;
    private String fileType;
    private String filePath;
    private String userId;
    private boolean trashed;
    private boolean synced;

}
