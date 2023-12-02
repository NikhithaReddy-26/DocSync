package com.contiq.fileservice.factory;

import com.contiq.fileservice.exception.FileNotSupportedException;
import com.contiq.fileservice.filereader.FileReader;
import com.contiq.fileservice.filereader.PdfFileReader;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FileReaderFactoryTest {

    @Test
    void testGetFileReader_PdfExtension() {
        // Test for PDF extension
        String pdfExtension = "pdf";
        FileReader reader = FileReaderFactory.getFileReader(pdfExtension);
        assertNotNull(reader);
        assertTrue(reader instanceof PdfFileReader);
    }

    @Test
    void testGetFileReader_UnknownExtension() {
        // Test for an unknown extension
        String unknownExtension = "txt";
        assertThrows(FileNotSupportedException.class, () -> {
            FileReaderFactory.getFileReader(unknownExtension);
        });
    }

}
