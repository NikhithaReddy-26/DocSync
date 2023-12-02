package com.contiq.fileservice.service.impl;

import com.contiq.fileservice.constant.TestConstant;
import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.dto.FileResponseDto;
import com.contiq.fileservice.entity.FileDocument;
import com.contiq.fileservice.exception.FileNotFoundException;
import com.contiq.fileservice.exception.ParseDataException;
import com.contiq.fileservice.exception.RepositoryOperationException;
import com.contiq.fileservice.exception.UserIdNotProvidedException;
import com.contiq.fileservice.repository.FileDocumentRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class FileServiceImplTest {

    @Mock
    private FileDocumentRepository fileDocumentRepository;
    @Mock
    private GoogleDriveService googleDriveService;
    @InjectMocks
    private FileServiceImpl fileService;

    @BeforeAll
    void setup(){
        fileService = new FileServiceImpl();
        MockitoAnnotations.openMocks(this);
    }

    @AfterAll
    void tearDown(){
        fileService = null;
    }

    @Test
    void testGetFileById() {
        // Mock data
        String fileId = "fileId123";
        FileDocument fileDocument = new FileDocument();
        fileDocument.setFileId(fileId);

        // Mock repository response
        when(fileDocumentRepository.findById(fileId)).thenReturn(Optional.of(fileDocument));

        // Test
        FileResponseDto responseDto = fileService.getFileById(fileId);

        // Assertions
        assertNotNull(responseDto);
        assertEquals(fileId, responseDto.getFileId());
    }

    @Test
    void testGetFileById_FileNotFound() {
        // Mock data
        String fileId = "fileId123";

        // Mock repository response
        when(fileDocumentRepository.findById(fileId)).thenReturn(Optional.empty());

        // Test and assertion
        assertThrows(FileNotFoundException.class, () -> fileService.getFileById(fileId));
    }

    @Test
    void testSaveFileMetaData_UserIdNotProvided() {
        // Mock data
        MultipartFile multipartFile = mock(MultipartFile.class);
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();

        // Test and assertion
        assertThrows(UserIdNotProvidedException.class, () -> fileService.saveFileMetaData(multipartFile, metadata));
    }

    @Test
    void testSaveFileMetaData_FailedToSaveFile() throws IOException {
        // Mock data
        MultipartFile multipartFile = mock(MultipartFile.class);
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();
        metadata.setUserId("user123");

        // Mock repository response
        when(multipartFile.getOriginalFilename()).thenThrow(ParseDataException.class);

        // Test and assertion
        assertThrows(ParseDataException.class, () -> fileService.saveFileMetaData(multipartFile, metadata));
    }

    @Test
    void testGetFiles() {
        // Mock data
        List<String> fileIds = List.of("fileId1", "fileId2");
        List<FileDocument> fileDocuments = new ArrayList<>();
        for (String fileId : fileIds) {
            FileDocument fileDocument = new FileDocument();
            fileDocument.setFileId(fileId);
            fileDocuments.add(fileDocument);
        }

        // Mock repository response
        when(fileDocumentRepository.findAllById(fileIds)).thenReturn(fileDocuments);

        // Test
        List<FileResponseDto> responseDtos = fileService.getFiles(fileIds);

        // Assertions
        assertNotNull(responseDtos);
        assertEquals(fileIds.size(), responseDtos.size());
        for (int i = 0; i < fileIds.size(); i++) {
            assertEquals(fileIds.get(i), responseDtos.get(i).getFileId());
        }
    }

    @Test
    void testGetFiles_EmptyList() {
        // Mock data
        List<String> fileIds = new ArrayList<>();

        // Mock repository response
        when(fileDocumentRepository.findAll()).thenReturn(new ArrayList<>());

        // Test
        List<FileResponseDto> responseDtos = fileService.getFiles(fileIds);

        // Assertions
        assertNotNull(responseDtos);
        assertTrue(responseDtos.isEmpty());
    }

    @Test
    void testGetFilesByUserId() {
        // Mock data
        String userId = "user123";
        List<FileDocument> fileDocuments = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            FileDocument fileDocument = new FileDocument();
            fileDocument.setFileId("fileId" + i);
            fileDocument.setUserId(userId);
            fileDocuments.add(fileDocument);
        }

        // Mock repository response
        when(fileDocumentRepository.findByUserId(userId)).thenReturn(fileDocuments);

        // Test
        List<FileResponseDto> responseDtos = fileService.getFilesByUserId(userId);

        // Assertions
        assertNotNull(responseDtos);
        assertEquals(fileDocuments.size(), responseDtos.size());
        for (int i = 0; i < fileDocuments.size(); i++) {
            assertEquals(userId, responseDtos.get(i).getUserId());
        }
    }

    @Test
    void testGetFilesByUserId_NoFilesFound() {
        // Mock data
        String userId = "user123";

        // Mock repository response
        when(fileDocumentRepository.findByUserId(userId)).thenReturn(new ArrayList<>());

        // Test
        List<FileResponseDto> responseDtos = fileService.getFilesByUserId(userId);

        // Assertions
        assertNotNull(responseDtos);
        assertTrue(responseDtos.isEmpty());
    }

    @Test
    void testGetFilesBySearchKey() {
        // Mock data
        String searchKey = "keyword";
        String userId = "user123";
        List<FileDocument> fileDocuments = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            FileDocument fileDocument = new FileDocument();
            fileDocument.setFileId("fileId" + i);
            fileDocument.setUserId(userId);
            fileDocument.setFileName("File with keyword in name");
            fileDocument.setContent("Content with keyword");
            fileDocuments.add(fileDocument);
        }

        // Mock repository response
        when(fileDocumentRepository.findBySearchKey(searchKey, userId)).thenReturn(fileDocuments);

        // Test
        List<FileResponseDto> responseDtos = fileService.getFilesBySearchKey(searchKey, userId);

        // Assertions
        assertNotNull(responseDtos);
        assertEquals(fileDocuments.size(), responseDtos.size());
    }

    @Test
    void testGetFilesBySearchKey_NoFilesFound() {
        // Mock data
        String searchKey = "keyword";
        String userId = "user123";

        // Mock repository response
        when(fileDocumentRepository.findBySearchKey(searchKey, userId)).thenReturn(new ArrayList<>());

        // Test
        List<FileResponseDto> responseDtos = fileService.getFilesBySearchKey(searchKey, userId);

        // Assertions
        assertNotNull(responseDtos);
        assertTrue(responseDtos.isEmpty());
    }

    @Test
    void testGetFileResource() {
        ResponseEntity<Resource> response = fileService.getFileResource("src/test/resources/test.txt");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.parseMediaType("application/octet-stream"), response.getHeaders().getContentType());
        assertNotNull(response.getBody());
    }

    @Test
    void testGetFileResource_FileNotFound() {
        assertThrows(FileNotFoundException.class, () -> fileService.getFileResource("test.txt"));
    }

    @Test
    void testDeleteFilesById_Success() {
        // Arrange
        List<String> fileIds = Arrays.asList("fileId1", "fileId2");

        // Mock the behavior of the fileDocumentRepository
        doNothing().when(fileDocumentRepository).deleteAllById(fileIds);

        // Act
        boolean result = fileService.deleteFilesById(fileIds);

        // Assert
        verify(fileDocumentRepository, times(1)).deleteAllById(fileIds);
        assert(result);
    }

    @Test
    void testDeleteFilesById_RepositoryException() {
        // Arrange
        List<String> fileIds = Arrays.asList("fileId1", "fileId2");

        // Mock the behavior of the fileDocumentRepository to throw an exception
        doThrow(new RuntimeException("Repository Exception")).when(fileDocumentRepository).deleteAllById(fileIds);

        // Act and Assert
        assertThrows(RepositoryOperationException.class, () -> {
            fileService.deleteFilesById(fileIds);
        });
    }

    @Test
    void testUpdateFileMetaDataWithMultipartFile() throws IOException {
        // Arrange
        String fileId = "fileId123";
        String userId = "123";
        String fileName = "example.txt";
        String updatedFileName = "updated.txt";
        byte[] fileContent = "File content".getBytes(StandardCharsets.UTF_8);
        ReflectionTestUtils.setField(fileService, "baseStorageLocation", "src/test/uploads" );
        // Create a mock MultipartFile
        MultipartFile mockMultipartFile = new MockMultipartFile("test.pdf", "test.pdf", "",
                TestConstant.PDF_BYTE_ARRAY);

        // Create a mock FileDocument
        FileDocument mockFileDocument = new FileDocument();
        mockFileDocument.setFileId(fileId);
        mockFileDocument.setFileName(fileName);
        mockFileDocument.setUserId(userId);
        mockFileDocument.setContent("Initial content");
        mockFileDocument.setUpdatedOn(new Date());

        //create metadata
        FileMetaDataRequestDto fileMetaDataRequestDto = new FileMetaDataRequestDto();
        fileMetaDataRequestDto.setUserId("123");

        // Mock the behavior of the FileDocumentRepository
        when(fileDocumentRepository.findById(fileId)).thenReturn(Optional.of(mockFileDocument));
        when(fileDocumentRepository.save(any(FileDocument.class))).thenReturn(mockFileDocument);


        // Act
        String updatedFileId = fileService.updateFileMetaData(fileId, mockMultipartFile, fileMetaDataRequestDto);

        Assertions.assertEquals("fileId123",updatedFileId);

        // Add more assertions as needed
    }

    @Test
    void testSaveFileMetaDataWithMultipartFile() throws IOException {
        // Arrange
        String fileId = "fileId123";
        String userId = "123";
        String fileName = "example.txt";
        String updatedFileName = "updated.txt";
        byte[] fileContent = "File content".getBytes(StandardCharsets.UTF_8);
        ReflectionTestUtils.setField(fileService, "baseStorageLocation", "src/test/uploads" );
        // Create a mock MultipartFile
        MultipartFile mockMultipartFile = new MockMultipartFile("test.pdf", "test.pdf", "",
                TestConstant.PDF_BYTE_ARRAY);

        // Create a mock FileDocument
        FileDocument mockFileDocument = new FileDocument();
        mockFileDocument.setFileId(fileId);
        mockFileDocument.setFileName(fileName);
        mockFileDocument.setUserId(userId);
        mockFileDocument.setContent("Initial content");
        mockFileDocument.setUpdatedOn(new Date());

        //create metadata
        FileMetaDataRequestDto fileMetaDataRequestDto = new FileMetaDataRequestDto();
        fileMetaDataRequestDto.setUserId("123");

        when(fileDocumentRepository.save(any(FileDocument.class))).thenReturn(mockFileDocument);


        // Act
        String docFileId = fileService.saveFileMetaData( mockMultipartFile, fileMetaDataRequestDto);

        Assertions.assertEquals("fileId123",docFileId);

        // Add more assertions as needed
    }

    @Test
    void testUpdateFileMetaDataWithFileNotFound() {
        // Mock data
        String fileId = "nonExistentFileId";
        String userId = "testUserId";
        String fileName = "testFileName.pdf";
        FileMetaDataRequestDto metadata = new FileMetaDataRequestDto();
        metadata.setUserId(userId);
        metadata.setFileName(fileName);

        // Mock repository to return an empty optional, simulating a file not found
        when(fileDocumentRepository.findById(fileId)).thenReturn(Optional.empty());

        // Execute the service method and expect a FileNotFoundException
        assertThrows(FileNotFoundException.class, () -> fileService.updateFileMetaData(fileId, null, metadata));
    }

}
