package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.WeatherDTO;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.service.SearchService;
import com.monster.luv_cocktail.domain.service.WeatherService;
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

@CrossOrigin(
        origins = {"https://localhost:5174"}
)
@RequestMapping({"/weather"})
@RestController
public class WeatherController {
    @Autowired
    private WeatherService weatherService;
    @Autowired
    private SearchService searchService;

    public WeatherController() {
    }

    @GetMapping({"/api/today"})
    public ResponseEntity<Map<String, Object>> getRecommendCocktailsByWeather(@RequestParam("lat") double lat, @RequestParam("lon") double lon) {
        System.out.println("lat: " + lat + ", lon: " + lon);
        WeatherDTO weatherInfo = this.weatherService.getWeather(lat, lon).block();
        String weatherCode = this.weatherService.getWeatherCode(weatherInfo);
        List<Cocktail> recommendedCocktails = this.searchService.findCocktailsByWeatherCode(weatherCode);
        Map<String, Object> response = new HashMap();
        response.put("weatherInfo", weatherInfo);
        response.put("recommendedCocktails", recommendedCocktails);
        return ResponseEntity.ok(response);
    }
}
