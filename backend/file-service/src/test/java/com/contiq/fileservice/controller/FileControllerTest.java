package com.contiq.fileservice.controller;

import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.exception.*;
import com.contiq.fileservice.service.FileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FileController.class)
class FileControllerTest {

    @MockBean
    private FileService fileService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testSaveFile() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();
        ObjectMapper objectMapper = new ObjectMapper();
        String metadataJson = objectMapper.writeValueAsString(metadata);
        MockMultipartFile metadataParam = new MockMultipartFile("metadata", "metadata", MediaType.APPLICATION_JSON_VALUE, metadataJson.getBytes());
        when(fileService.saveFileMetaData(file, metadata)).thenReturn("fileId123");
        mockMvc.perform(
                        multipart("/files")
                                .file(file)
                                .file(metadataParam) // Define 'metadata' part as a parameter
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value("fileId123"));
        verify(fileService, times(1)).saveFileMetaData(file, metadata);
    }

    @Test
    void testSaveFile_FileNotSupported() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();
        ObjectMapper objectMapper = new ObjectMapper();
        String metadataJson = objectMapper.writeValueAsString(metadata);
        MockMultipartFile metadataParam = new MockMultipartFile("metadata", "metadata", MediaType.APPLICATION_JSON_VALUE, metadataJson.getBytes());
        when(fileService.saveFileMetaData(file, metadata)).thenThrow(new FileNotSupportedException("txt"));
        mockMvc.perform(
                        multipart("/files")
                                .file(file)
                                .file(metadataParam) // Define 'metadata' part as a parameter
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isBadRequest());
        verify(fileService, times(1)).saveFileMetaData(file, metadata);
    }

    @Test
    void testSaveFile_UserIdNotProvided() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();
        ObjectMapper objectMapper = new ObjectMapper();
        String metadataJson = objectMapper.writeValueAsString(metadata);
        MockMultipartFile metadataParam = new MockMultipartFile("metadata", "metadata", MediaType.APPLICATION_JSON_VALUE, metadataJson.getBytes());
        when(fileService.saveFileMetaData(file, metadata)).thenThrow(new UserIdNotProvidedException());
        mockMvc.perform(
                        multipart("/files")
                                .file(file)
                                .file(metadataParam) // Define 'metadata' part as a parameter
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isBadRequest());
        verify(fileService, times(1)).saveFileMetaData(file, metadata);
    }

    @Test
    void testGetFiles() throws Exception {
        List<String> fileIds = Collections.singletonList("fileId123");
        when(fileService.getFiles(fileIds)).thenReturn(Collections.emptyList());
        mockMvc.perform(
                        get("/files")
                                .param("fileIds", "fileId123")
                )
                .andExpect(status().isOk());
        verify(fileService, times(1)).getFiles(fileIds);
    }

    @Test
    void testGetFiles_FileNotFound() throws Exception {
        List<String> fileIds = Collections.singletonList("fileId123");
        when(fileService.getFiles(fileIds)).thenThrow(new FileNotFoundException("fileId23"));
        mockMvc.perform(
                        get("/files")
                                .param("fileIds", "fileId123")
                )
                .andExpect(status().isNotFound());
        verify(fileService, times(1)).getFiles(fileIds);
    }

    @Test
    void testGetFilesByUserId() throws Exception {
        String userId = "user123";
        when(fileService.getFilesByUserId(userId)).thenReturn(Collections.emptyList());
        mockMvc.perform(
                        get("/files/{userId}", userId)
                )
                .andExpect(status().isOk());
        verify(fileService, times(1)).getFilesByUserId(userId);
    }

    @Test
    void testGetFilesBySearchKeyword() throws Exception {
        String searchKey = "keyword";
        String userId = "user123";
        when(fileService.getFilesBySearchKey(searchKey, userId)).thenReturn(Collections.emptyList());
        mockMvc.perform(
                        get("/files/search")
                                .param("searchKey", searchKey)
                                .param("userId", userId)
                )
                .andExpect(status().isOk());
        verify(fileService, times(1)).getFilesBySearchKey(searchKey, userId);
    }

    @Test
    void testGetFileResource() throws Exception {
        String filepath = "path/to/file.txt";
        Resource mockResource = new ByteArrayResource("Mock resource content".getBytes());
        when(fileService.getFileResource(filepath)).thenReturn(new ResponseEntity<>(mockResource, HttpStatus.OK));
        mockMvc.perform(
                        get("/files/resource")
                                .param("filepath", filepath)
                )
                .andExpect(status().isOk());
        verify(fileService, times(1)).getFileResource(filepath);
    }

    @Test
    void testGetFileResource_ParseDataException() throws Exception {
        String filepath = "path/to/file.txt";
        Resource mockResource = new ByteArrayResource("Mock resource content".getBytes());
        when(fileService.getFileResource(filepath)).thenThrow(new ParseDataException("file.txt"));
        mockMvc.perform(
                        get("/files/resource")
                                .param("filepath", filepath)
                )
                .andExpect(status().isInternalServerError());
        verify(fileService, times(1)).getFileResource(filepath);
    }

    @Test
    void testDeleteFilesById() throws Exception {
        // Arrange
        List<String> fileIdsToDelete = Arrays.asList("fileId1");
        String fileIds = "fileId1";
        when(fileService.deleteFilesById(fileIdsToDelete)).thenReturn(true);

        // Act
        mockMvc.perform(
                        delete("/files/fileIds")
                                .param("fileIds", fileIds)
                )
                .andExpect(status().isOk());
        //assertion
        verify(fileService, times(1)).deleteFilesById(fileIdsToDelete);
    }
    @Test
    void testDeleteFilesById_Exception() throws Exception {
        // Arrange
        List<String> fileIdsToDelete = Arrays.asList("fileId1");
        String fileIds = "fileId1";
        when(fileService.deleteFilesById(fileIdsToDelete)).thenThrow(new RepositoryOperationException("delete"));

        // Act
        mockMvc.perform(
                        delete("/files/fileIds")
                                .param("fileIds", fileIds)
                )
                .andExpect(status().isInternalServerError());
        //assertion
        verify(fileService, times(1)).deleteFilesById(fileIdsToDelete);
    }

    @Test
    void testUpdateFile() throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", "test.txt", "text/plain", "Test content".getBytes());
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();
        ObjectMapper objectMapper = new ObjectMapper();
        String metadataJson = objectMapper.writeValueAsString(metadata);
        MockMultipartFile metadataParam = new MockMultipartFile("metadata", "metadata", MediaType.APPLICATION_JSON_VALUE, metadataJson.getBytes());
        when(fileService.updateFileMetaData("file1",file, metadata)).thenReturn("fileId123");
        mockMvc.perform(
                        multipart("/files/{fileId}","file1")
                                .file(file)
                                .file(metadataParam) // Define 'metadata' part as a parameter
                                .contentType(MediaType.MULTIPART_FORM_DATA)
                )
                .andExpect(status().isOk());
        verify(fileService, times(1)).updateFileMetaData("file1",file, metadata);
    }

}
