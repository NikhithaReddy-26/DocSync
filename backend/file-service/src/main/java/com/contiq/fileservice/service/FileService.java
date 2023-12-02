package com.contiq.fileservice.service;

import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.dto.FileResponseDto;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileService {

    FileResponseDto getFileById(String id);

    String saveFileMetaData(MultipartFile multipartFile, FileMetaDataRequestDto metadata);

    List<FileResponseDto> getFiles(List<String> fileIds);

    List<FileResponseDto> getFilesByUserId(String userId);

    List<FileResponseDto> getFilesBySearchKey(String searchKey, String userId);

    ResponseEntity<Resource> getFileResource(String filepath);
    boolean deleteFilesById(List<String> fileIds);
    String updateFileMetaData(String fileId,MultipartFile multipartFile, FileMetaDataRequestDto metadata);

}
