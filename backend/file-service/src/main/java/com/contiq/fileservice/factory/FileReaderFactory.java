package com.contiq.fileservice.factory;

import com.contiq.fileservice.constant.Constant;
import com.contiq.fileservice.exception.FileNotSupportedException;
import com.contiq.fileservice.filereader.FileReader;
import com.contiq.fileservice.filereader.PdfFileReader;

public class FileReaderFactory {

    private FileReaderFactory() {
        super();
    }

    /**
     *  Method to initialize and get FileReader object for respective extension
     * @param extension
     * @return FileReader implementation
     */
    public static FileReader getFileReader(String extension){
        if (extension.trim().equalsIgnoreCase(Constant.PDF)){
            return new PdfFileReader();
        }
        throw new FileNotSupportedException(extension);
    }
}
