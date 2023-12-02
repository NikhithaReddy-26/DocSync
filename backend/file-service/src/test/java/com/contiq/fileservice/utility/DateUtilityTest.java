package com.contiq.fileservice.utility;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class DateUtilityTest {

    @Test
    void getCurrentDate() {
        Date date = DateUtility.getCurrentDate();
        Assertions.assertEquals(new Date(), date);
    }
}