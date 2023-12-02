package com.contiq.fileservice.repository;

import com.contiq.fileservice.entity.FileDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDocumentRepository extends ElasticsearchRepository<FileDocument, String> {

    List<FileDocument> findByUserId(String userId);

    @Query("{\"bool\": {\"must\" : [{\"match\" : {\"userId\" : \"?1\"}}]," +
            "\"should\":[{\"wildcard\": {\"fileName\" : \"*?0*\"}}, {\"wildcard\":{\"content\": \"*?0*\"}}]" +
            ",\"minimum_should_match\": 1}}")
    List<FileDocument> findBySearchKey(String searchKey, String userId);
}
