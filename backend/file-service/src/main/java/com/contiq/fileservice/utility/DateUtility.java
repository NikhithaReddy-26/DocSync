package com.contiq.fileservice.utility;

import java.util.Date;

public class DateUtility {

    private DateUtility(){
        super();
    }

    /**
     *  Method to return current date
     */
    public static Date getCurrentDate() {
        return new Date();
    }
}
