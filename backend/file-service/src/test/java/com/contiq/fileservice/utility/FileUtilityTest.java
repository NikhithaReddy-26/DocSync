package com.contiq.fileservice.utility;

import com.contiq.fileservice.filereader.FileReader;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

class FileUtilityTest {

    @Mock
    private FileReader mockFileReader;

    @BeforeEach
    void setUp() {
        mockFileReader = mock(FileReader.class);
    }

    @Test
    void testGetExtension() {
        String fileName = "example.pdf";
        String extension = FileUtility.getExtension(fileName);
        assertEquals("pdf", extension);
    }

    @Test
    void testSaveFileInDirectory() throws IOException {
        byte[] content = "File content".getBytes();
        String tempDir = System.getProperty("java.io.tmpdir");
        String filePath = tempDir + "/test.txt";

        FileUtility.saveFileInDirectory(content, Path.of(filePath));

        // Verify that the file was created
        assertTrue(Files.exists(Path.of(filePath)));

        // Clean up: delete the created file
        Files.deleteIfExists(Path.of(filePath));
    }
    @Test
    void testSanitizeFileName() {
        String sanitizedFileName = FileUtility.sanitizeFileName("test/doc.pdf");
        assertEquals("testdoc.pdf", sanitizedFileName);
    }

    @Test
    void testSanitizeUserId() {
        String sanitizedUserId = FileUtility.sanitizeUserId("user/id123");
        assertEquals("userid123", sanitizedUserId);
    }
}
