package com.monster.luv_cocktail.domain.service;

import java.beans.JavaBean;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

//@RequiredArgsConstructor
@Component
public class TranslationService {

	
	
	 private static final Logger log = LoggerFactory.getLogger(TranslationService.class);
  
	 @Value("classpath:google-translate.json")
	 private Resource gcpCredentials;
//    private String gcpCredentials = "Afsfa";

    private Translate translate;

    @PostConstruct
    public void init() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(gcpCredentials.getInputStream())
            .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));
        translate = TranslateOptions.newBuilder().setCredentials(credentials).build().getService();
    }

    public String translateToKorean(String text) {
        if (text == null || text.isEmpty()) {
            return text;
        }
        try {
            Translation translation = translate.translate(
                text,
                Translate.TranslateOption.sourceLanguage("en"),
                Translate.TranslateOption.targetLanguage("ko")
            );
            return translation.getTranslatedText();
        } catch (Exception e) {
            // 오류 로깅 또는 적절한 예외 처리
            System.err.println("Translation error: " + e.getMessage());
            return text; // API 호출에 실패한 경우 원문 반환
        }
    }

}