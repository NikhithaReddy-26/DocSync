package com.contiq.fileservice.constant;

public class Constant {
    private Constant(){
        super ();
    }

    // Error messages
    public static final String FILE_NOT_FOUND = "File not found : %s";
    public static final String FILE_NOT_SUPPORTED = "File with extension %s is not supported yet";
    public static final String PARSE_DATA_ERROR = "Error occurred while parsing the data for file : %s";
    public static final String USER_ID_NOT_PROVIDED = "User id not provided";

    public static final String TIMESTAMP_STRING = "timestamp";
    public static final String MESSAGE_STRING = "message";
    public static final String DELETE_SUCCESS_MESSAGE = "Files deleted successfully: ";
    public static final String REPOSITORY_OPERATION_ERROR = "%s operation failed";


    // Extensions
    public static final String PDF = "pdf";

    // media type stream
    public static final String OCTET_STREAM = "application/octet-stream";
}
