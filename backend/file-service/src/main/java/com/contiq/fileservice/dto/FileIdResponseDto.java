package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileIdResponseDto {
    private String id;
    private int statusCode;
}
