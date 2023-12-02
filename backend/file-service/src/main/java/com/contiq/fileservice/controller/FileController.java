package com.contiq.fileservice.controller;

import com.contiq.fileservice.constant.Constant;
import com.contiq.fileservice.dto.FileIdResponseDto;
import com.contiq.fileservice.dto.FileListReponseDto;
import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.dto.MessageResponseDto;
import com.contiq.fileservice.service.FileService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;

    /**
     * Controller to POST a multipart file into elastic search for indexing
     * @param file
     * @param metadataJson
     * @return
     */
    @PostMapping
    public ResponseEntity<FileIdResponseDto> saveFile(
            @RequestPart(value = "file",required = false) MultipartFile file,
            @RequestPart("metadata") String metadataJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        FileMetaDataRequestDto parsedDto = null;
        try {
            parsedDto = objectMapper.readValue(metadataJson, FileMetaDataRequestDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
//        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto(metadataJson);
        return new ResponseEntity<>(
                new FileIdResponseDto(fileService.saveFileMetaData(file, parsedDto), HttpStatus.CREATED.value()),
                HttpStatus.CREATED);
    }

    /**
     * Controller to get all files or files with ids provided in query params
     * @param fileIds
     * @return
     */
    @GetMapping
    public ResponseEntity<FileListReponseDto> getFiles(
            @RequestParam(value = "fileIds", required = false) List<String> fileIds){
        return new ResponseEntity<>(
                new FileListReponseDto(fileService.getFiles(fileIds), HttpStatus.OK.value()),
                HttpStatus.OK
        );
    }

    /**
     * Controller to get files specific to a userId
     * @param userId
     * @return
     */
    @GetMapping("/{userId}")
    public ResponseEntity<FileListReponseDto> getFilesByUserId(
            @PathVariable("userId") String userId) {
        return new ResponseEntity<>(
                new FileListReponseDto(fileService.getFilesByUserId(userId), HttpStatus.OK.value()),
                HttpStatus.OK
        );
    }

    /**
     * Controller to search files containing the search key in file name or file content
     * @param searchKey
     * @param userId
     * @return
     */
    @GetMapping("/search")
    public ResponseEntity<FileListReponseDto> getFilesBySearchKeyword(
            @RequestParam(value = "searchKey") String searchKey,
            @RequestParam(value = "userId") String userId ) {
        return new ResponseEntity<>(
                new FileListReponseDto(fileService.getFilesBySearchKey(searchKey, userId), HttpStatus.OK.value()),
                HttpStatus.OK
        );
    }

    @GetMapping("/resource")
    public ResponseEntity<Resource> getFileResource(@RequestParam String filepath) {
        return fileService.getFileResource(filepath);
    }

    @DeleteMapping("/fileIds")
    public ResponseEntity<MessageResponseDto> deleteFilesById(@RequestParam(value = "fileIds", required = true) List<String> fileIds) {
        fileService.deleteFilesById(fileIds);
        return new ResponseEntity<>(new MessageResponseDto(Constant.DELETE_SUCCESS_MESSAGE,HttpStatus.OK.value()),HttpStatus.OK );
    }

    @PostMapping("/{fileId}")
    public ResponseEntity<FileIdResponseDto> updateFile(
            @PathVariable String fileId,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart("metadata") String metadataJson) {
        ObjectMapper objectMapper = new ObjectMapper();
        FileMetaDataRequestDto parsedDto = null;
        try {
            parsedDto = objectMapper.readValue(metadataJson, FileMetaDataRequestDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
//        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto(metadataJson);
        String updatedFileId = fileService.updateFileMetaData(fileId, file, parsedDto);
        return new ResponseEntity<>(
                new FileIdResponseDto(updatedFileId, HttpStatus.OK.value()),
                HttpStatus.OK);
    }
}
