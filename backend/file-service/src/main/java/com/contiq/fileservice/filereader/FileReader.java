package com.contiq.fileservice.filereader;

import java.io.IOException;

public interface FileReader {

    /**
     *  Method to read and parse the content of the file
     * @param bytes
     * @return String
     * @throws IOException
     */
    String getFileContent(byte[] bytes) throws IOException;

}
