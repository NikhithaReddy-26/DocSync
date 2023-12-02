package com.contiq.fileservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.util.Date;

@Document(indexName = "file")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDocument {

    @Id
    @Field(type= FieldType.Keyword)
    private String fileId;
    @Field(type= FieldType.Text)
    private String fileName;
    @Field(type= FieldType.Text)
    private String fileType;
    @Field(type= FieldType.Text)
    private String filePath;
    @Field(type= FieldType.Text)
    private String content;
    @Field(type = FieldType.Text)
    private String userId;
    @Field(type= FieldType.Boolean)
    private boolean trashed;
    @Field(type= FieldType.Boolean)
    private boolean synced;
    @Field(type= FieldType.Date)
    private Date createdOn;
    @Field(type= FieldType.Date)
    private Date updatedOn;

}
