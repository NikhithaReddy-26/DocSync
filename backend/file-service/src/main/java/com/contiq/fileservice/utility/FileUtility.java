package com.contiq.fileservice.utility;

import com.contiq.fileservice.dto.FileMetaDataRequestDto;
import com.contiq.fileservice.factory.FileReaderFactory;
import com.contiq.fileservice.filereader.FileReader;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileUtility {

    private FileUtility() {
        super();
    }

    /**
     * Method to extract file content
     * @param file
     * @return String
     * @throws IOException
     */
    public static String extractContentFromFile(MultipartFile file) throws IOException {
        FileReader fileReader = FileReaderFactory.getFileReader(getExtension(file.getOriginalFilename()));
        return fileReader.getFileContent(file.getBytes());
    }

    public static String extractContentFromFile(FileMetaDataRequestDto metadata, byte[] byteArrayStream) throws IOException {
        FileReader fileReader = FileReaderFactory.getFileReader(getExtension(metadata.getFileName()));
        return fileReader.getFileContent(byteArrayStream);
    }

    /**
     * Method to return extension of file
     * @param fileName
     * @return String
     */
    public static String getExtension(String fileName) {
        return StringUtils.getFilenameExtension(fileName);
    }

    public static void saveFileInDirectory(byte[] content, Path path) throws IOException {
        Files.createDirectories(path.getParent());
        Files.write(path, content);
    }

    public static String sanitizeUserId(String userId) {
        return userId.replaceAll("[^a-zA-Z0-9_\\-]", "");
    }

    public static String sanitizeFileName(String fileName){
        return fileName.replaceAll("[^a-zA-Z0-9_\\-\\.]", "");
    }

}
