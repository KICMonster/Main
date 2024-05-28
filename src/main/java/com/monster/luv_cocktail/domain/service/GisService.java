package com.monster.luv_cocktail.domain.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.monster.luv_cocktail.domain.dto.SearchResponse;

@Service
public class GisService {

	@Value("${gis.api.key}")
	private String KAKAO_API_KEY; // 카카오 API 키

	@Value("${gis.api.url}")
	private String KAKAO_API_URL;

	public ResponseEntity<SearchResponse> getPlaceInfo(double latitude, double longitude) throws Exception {
		try {
			// HTTP 요청을 위한 RestTemplate 객체 생성

			String query = "술집"; // 검색 키워드
			String url = KAKAO_API_URL + "?query=" + query + "&x=" + longitude + "&y=" + latitude;

			RestTemplate restTemplate = new RestTemplate();
			HttpHeaders headers = new HttpHeaders();
			headers.set("Authorization", "KakaoAK " + KAKAO_API_KEY);
			HttpEntity<String> entity = new HttpEntity<>(headers);

			ResponseEntity<SearchResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity,
					SearchResponse.class);
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
			System.out.println(response.getBody()); // 반환된 JSON 출력
			return ResponseEntity.ok().body(response.getBody());
		} catch (Exception e) {
			// 로그에 에러 메시지 출력
			e.printStackTrace(); // 개발 환경에서만 사용, 운영 환경에서는 로그 레벨에 따라 로깅
			throw new RuntimeException("API 호출 중 에러 발생: " + e.getMessage());
		}
	}
}