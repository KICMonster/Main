package com.monster.luv_cocktail.domain.config.data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class ApiConfig {
    @Value("${rapid.api.key}")
    private String apiKey;
    @Value("${rapid.api.requestURI}")
    private String apirequestURI;
    @Value("${rapid.api.host}")
    private String apihost;
}