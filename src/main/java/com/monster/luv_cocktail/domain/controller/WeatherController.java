package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.IndexCocktailDTO;
import com.monster.luv_cocktail.domain.dto.WeatherDTO;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.scheduler.WeatherUpdateScheduler;
import com.monster.luv_cocktail.domain.service.SearchService;
import com.monster.luv_cocktail.domain.service.WeatherService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.extern.log4j.Log4j2;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = { "https://localhost:5174" })
@RequestMapping({ "/api/weather" })
@RestController
@Log4j2
public class WeatherController {
	@Autowired
	private WeatherService weatherService;
	@Autowired
	private SearchService searchService;
	@Autowired
	private WeatherUpdateScheduler weatherUpdateScheduler;

	public WeatherController() {
	}

	@GetMapping("/today")
    @Operation(summary = "오늘의 칵테일 리스트", description = "날씨 데이터를 기반으로 오늘의 칵테일 리스트 추천")
	public ResponseEntity<Map<String, Object>> getRecommendCocktailsByWeather(@RequestParam("lat") double lat,
			@RequestParam("lon") double lon) {
		weatherUpdateScheduler.updateCocktailsForLocation(lat, lon);
		List<IndexCocktailDTO> recommendedCocktails = weatherUpdateScheduler.getCachedCocktails();
		WeatherDTO weatherInfo = this.weatherService.getWeather(lat, lon).block();

		Map<String, Object> response = new HashMap<>();
		response.put("weatherInfo", weatherInfo);
		response.put("recommendedCocktails", recommendedCocktails);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/default")
    @Operation(summary = "기본값 세팅", description = "랜더링 속도를 빠르게 하기 위해 오늘의 칵테일 리스트 기본값을 세팅해둡니다")
	public ResponseEntity<List<IndexCocktailDTO>> getRecommendedCocktails() {
		List<IndexCocktailDTO> cachedCocktails = weatherUpdateScheduler.getCachedCocktails();
		log.info("cached cocktails: {}", cachedCocktails);
		return ResponseEntity.ok(cachedCocktails);
	}

}
