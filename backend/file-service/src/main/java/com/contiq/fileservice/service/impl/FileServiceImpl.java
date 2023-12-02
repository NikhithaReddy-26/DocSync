package com.contiq.fileservice.service.impl;

import com.contiq.fileservice.constant.Constant;
import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.dto.FileResponseDto;
import com.contiq.fileservice.entity.FileDocument;
import com.contiq.fileservice.exception.FileNotFoundException;
import com.contiq.fileservice.exception.ParseDataException;
import com.contiq.fileservice.exception.RepositoryOperationException;
import com.contiq.fileservice.exception.UserIdNotProvidedException;
import com.contiq.fileservice.repository.FileDocumentRepository;
import com.contiq.fileservice.service.FileService;
import com.contiq.fileservice.utility.DateUtility;
import com.contiq.fileservice.utility.FileUtility;
import com.contiq.fileservice.utility.MapperUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service("fileService")
@Scope("prototype")
public class FileServiceImpl implements FileService {

    @Autowired
    private FileDocumentRepository fileDocumentRepository;

    @Value("${file.storage.base}")
    private String baseStorageLocation;

    @Override
    public FileResponseDto getFileById(String id) {
        FileDocument fileDocument = fileDocumentRepository.findById(id).orElseThrow(()-> new FileNotFoundException(id));
        return MapperUtility.convertToResponseDto(fileDocument);
    }

    @Override
    public String saveFileMetaData(MultipartFile multipartFile, FileMetaDataRequestDto metadata){
        FileDocument file = new FileDocument();
        if (Objects.isNull(metadata.getUserId())){
            throw new UserIdNotProvidedException();
        }


        if(Objects.isNull(multipartFile)){
            try {
//                System.out.println(metadata.getUserId().trim());
                Path path = Paths.get(baseStorageLocation, metadata.getUserId().trim(), metadata.getFileName());
                ByteArrayOutputStream gDriveDownloadedFileByteArrayStream = GoogleDriveService.downloadFile(metadata.getFileId());
                MapperUtility.populateFileEntity(file, metadata, gDriveDownloadedFileByteArrayStream.toByteArray());
                file.setFilePath(path.toString());
                FileUtility.saveFileInDirectory(gDriveDownloadedFileByteArrayStream.toByteArray(), path);
            }catch (IOException ex){
                throw new UserIdNotProvidedException();
            }
        }else{
            try{
                String fileName = Objects.nonNull(metadata.getFileName())? metadata.getFileName() : multipartFile.getOriginalFilename();
                Path path = Paths.get(baseStorageLocation, metadata.getUserId().trim(), fileName);
                MapperUtility.populateFileEntity(file, multipartFile, metadata);
                file.setFilePath(path.toString());
                FileUtility.saveFileInDirectory(multipartFile.getBytes(), path);
            } catch (IOException ex) {
                throw new ParseDataException(multipartFile.getOriginalFilename());
            }
        }
        file = fileDocumentRepository.save(file);
        return file.getFileId();
    }

    @Override
    public List<FileResponseDto> getFiles(List<String> fileIds) {
        List<FileResponseDto> files = new ArrayList<>();
        if(!Objects.isNull(fileIds) && !fileIds.isEmpty()){
            fileDocumentRepository.findAllById(fileIds).forEach(t -> files.add(MapperUtility.convertToResponseDto(t)));
        } else {
            fileDocumentRepository.findAll().forEach(t -> files.add(MapperUtility.convertToResponseDto(t)));
        }
        return files;
    }

    @Override
    public List<FileResponseDto> getFilesByUserId(String userId) {
        return fileDocumentRepository.findByUserId(userId)
                .stream()
                .map(MapperUtility::convertToResponseDto)
                .toList();
    }

    @Override
    public List<FileResponseDto> getFilesBySearchKey(String searchKey, String userId) {
        return fileDocumentRepository.findBySearchKey(searchKey, userId)
                .stream()
                .map(MapperUtility::convertToResponseDto)
                .toList();
    }

    @Override
    public ResponseEntity<Resource> getFileResource(String filepath) {
        try {
            Path filePath = Path.of(filepath);
            Resource resource = getResource(filePath);

            if (resource.exists()) {
                String contentType = Constant.OCTET_STREAM;
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .body(resource);
            } else {
                throw new FileNotFoundException(filepath);
            }
        } catch (Exception e) {
            throw new FileNotFoundException(filepath);
        }
    }

    private Resource getResource(Path path) throws MalformedURLException {
        return new UrlResource(path.toUri());
    }

    @Override
    public boolean deleteFilesById(List<String> fileIds) {
        try{
            fileDocumentRepository.deleteAllById(fileIds);
        }catch (Exception ex){
            throw new RepositoryOperationException("delete");
        }
        return true;
    }

    @Override
    public String updateFileMetaData(String fileId, MultipartFile multipartFile, FileMetaDataRequestDto metadata) {
        FileDocument file = fileDocumentRepository.findById(fileId).orElseThrow(()->new FileNotFoundException(fileId));
        if (Objects.isNull(metadata.getUserId()))
            throw new UserIdNotProvidedException();
        if(Objects.isNull(multipartFile)){
            try {
                Path path = Paths.get(baseStorageLocation, metadata.getUserId().trim(), metadata.getFileName());
                ByteArrayOutputStream gDriveDownloadedFileByteArrayStream = GoogleDriveService.downloadFile(metadata.getFileId());
                file.setContent(FileUtility.extractContentFromFile(metadata,gDriveDownloadedFileByteArrayStream.toByteArray()));
                file.setUpdatedOn(DateUtility.getCurrentDate());
                FileUtility.saveFileInDirectory(gDriveDownloadedFileByteArrayStream.toByteArray(), path);
            }catch (IOException ex){
                throw new UserIdNotProvidedException();
            }
        }else{
            try{
                String fileName = Objects.nonNull(metadata.getFileName())? metadata.getFileName() : multipartFile.getOriginalFilename();
                Path path = Paths.get(baseStorageLocation, metadata.getUserId().trim(), fileName);
                file.setContent(FileUtility.extractContentFromFile(multipartFile));
                file.setUpdatedOn(DateUtility.getCurrentDate());
                FileUtility.saveFileInDirectory(multipartFile.getBytes(), path);
            } catch (IOException ex) {
                throw new ParseDataException(multipartFile.getOriginalFilename());
            }
        }
        file = fileDocumentRepository.save(file);
        return file.getFileId();
    }
}
