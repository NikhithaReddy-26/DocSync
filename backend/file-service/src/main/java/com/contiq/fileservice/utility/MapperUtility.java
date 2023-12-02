package com.contiq.fileservice.utility;

import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.dto.FileResponseDto;
import com.contiq.fileservice.entity.FileDocument;
import org.modelmapper.ModelMapper;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

public class MapperUtility {

    private MapperUtility() {
        super();
    }

    /**
     *  Populates file object using multipartFile and metadata
     * @param file
     * @param multipartFile
     * @param metadata
     */
    public static void populateFileEntity(FileDocument file, MultipartFile multipartFile, FileMetaDataRequestDto metadata) throws IOException {
        file.setUserId(metadata.getUserId());
        file.setFileId(Objects.nonNull(metadata.getFileId())? metadata.getFileId() : null);
        file.setFileName(Objects.nonNull(metadata.getFileName())? metadata.getFileName() : multipartFile.getOriginalFilename());
        file.setFileType(Objects.nonNull(metadata.getFileType())? metadata.getFileType() : FileUtility.getExtension(multipartFile.getOriginalFilename()));
        file.setSynced(Objects.nonNull(metadata.isSynced()));
        file.setContent(FileUtility.extractContentFromFile(multipartFile));
        file.setCreatedOn(DateUtility.getCurrentDate());
    }

    public static void populateFileEntity(FileDocument file, FileMetaDataRequestDto metadata, byte[] byteArrayStream) throws IOException {
        file.setUserId(metadata.getUserId());
        file.setFileId( metadata.getFileId());
        file.setFileName(metadata.getFileName());
        file.setFileType(metadata.getFileType());
        file.setTrashed(metadata.isTrashed());
        file.setSynced(metadata.isSynced());
        file.setCreatedOn(DateUtility.getCurrentDate());
        file.setContent(FileUtility.extractContentFromFile(metadata,byteArrayStream));
    }

    public static FileResponseDto convertToResponseDto(FileDocument fileDocument) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(fileDocument, FileResponseDto.class);
    }

}
