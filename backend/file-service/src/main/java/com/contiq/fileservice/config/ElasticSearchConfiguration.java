package com.contiq.fileservice.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.FileInputStream;
import java.security.KeyStore;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.contiq.fileservice.repository")
@Slf4j
public class ElasticSearchConfiguration extends ElasticsearchConfiguration {

    @Value("${elasticsearch.truststore.path}")
    private String truststorePath;

    @Value("${elasticsearch.truststore.password}")
    private String truststorePassword;

    @Value("${elasticsearch.host}")
    private String host;

    @Value("${elasticsearch.port}")
    private int port;

    @Value("${elasticsearch.username}")
    private String username;

    @Value("${elasticsearch.password}")
    private String password;

    @Override
    public ClientConfiguration clientConfiguration() {
        try(FileInputStream fis = new FileInputStream(truststorePath)) {
            KeyStore truststore = KeyStore.getInstance("JKS");
            truststore.load(fis, truststorePassword.toCharArray());

            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(truststore);

            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustManagerFactory.getTrustManagers(), null);

            return ClientConfiguration.builder()
                    .connectedTo(host+":"+port)
                    .usingSsl(sslContext)
                    .withBasicAuth(username, password)
                    .build();
        } catch (Exception e) {
            log.error("Failed to connect to Elasticsearch server. Exception: {}", e.getMessage());
            return null;
        }
    }
}