package com.contiq.fileservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileListReponseDto {
    private List<FileResponseDto> files;
    private int statusCode;
}
