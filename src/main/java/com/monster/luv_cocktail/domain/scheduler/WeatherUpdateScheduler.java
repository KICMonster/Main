//package com.monster.luv_cocktail.domain.scheduler;
//
//import com.monster.luv_cocktail.domain.dto.IndexCocktailDTO;
//import com.monster.luv_cocktail.domain.dto.WeatherDTO;
//import com.monster.luv_cocktail.domain.entity.Cocktail;
//import com.monster.luv_cocktail.domain.service.SearchService;
//import com.monster.luv_cocktail.domain.service.WeatherService;
//
//import jakarta.annotation.PostConstruct;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.extern.log4j.Log4j2;
//
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//
//@Component
//@EnableScheduling
//@Log4j2
//public class WeatherUpdateScheduler {
//
//    private final WeatherService weatherService;
//    private final SearchService searchService;
//    private List<IndexCocktailDTO> cachedCocktails;
//
//    public WeatherUpdateScheduler(WeatherService weatherService, SearchService searchService) {
//        this.weatherService = weatherService;
//        this.searchService = searchService;
//        this.cachedCocktails = new ArrayList<>();
//    }
//
//    @Scheduled(fixedRate = 3 * 60 * 60 * 1000, initialDelay = 0)
//    public void updateWeatherDataAndRecommendCocktails() {
//        updateCocktailsForLocation(37.5665, 126.978); // 서울의 위도와 경도
//    }
////    @PostConstruct
////    public void init() {
////    	 updateCocktailsForLocation(37.5665, 126.978); // 서울의 위도와 경도
////    }
//
//    public void updateCocktailsForLocation(double lat, double lon) {
////        WeatherDTO weatherInfo = this.weatherService.getWeather(lat, lon).block();
////        String weatherCode = this.weatherService.getWeatherCode(weatherInfo);
//        WeatherDTO weatherInfo = weatherService.getWeather(lat, lon).block();
//        String weatherCode = weatherService.getWeatherCode(weatherInfo);
//        log.info("weatherCode : {}", weatherCode);
//        log.info("weatherInfo : {}", weatherInfo);
//        log.info("lat : {}", lat);
//        log.info("long : {}", lon);
//        
//        List<Cocktail> cocktails = this.searchService.findCocktailsByWeatherCode(weatherCode);
//        this.cachedCocktails = cocktails.stream()
//                .map(IndexCocktailDTO::new)
//                .collect(Collectors.toList());
//        log.info("updateCocktails 정보 " + cachedCocktails);
//    }
//
//    public List<IndexCocktailDTO> getCachedCocktails() {
//        return cachedCocktails;
//    }
//}
package com.monster.luv_cocktail.domain.scheduler;

import com.monster.luv_cocktail.domain.dto.IndexCocktailDTO;
import com.monster.luv_cocktail.domain.dto.WeatherDTO;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.service.SearchService;
import com.monster.luv_cocktail.domain.service.WeatherService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Component
@EnableScheduling
public class WeatherUpdateScheduler {

    private final WeatherService weatherService;
    private final SearchService searchService;
    private List<IndexCocktailDTO> cachedCocktails;

    public WeatherUpdateScheduler(WeatherService weatherService, SearchService searchService) {
        this.weatherService = weatherService;
        this.searchService = searchService;
        this.cachedCocktails = new ArrayList<>();
    }

    @Scheduled(fixedRate = 3 * 60 * 60 * 1000)
    public void updateWeatherDataAndRecommendCocktails() {
        updateCocktailsForLocation(37.5665, 126.978); // 서울의 위도와 경도
    }

    public void updateCocktailsForLocation(double lat, double lon) {
        WeatherDTO weatherInfo = this.weatherService.getWeather(lat, lon).block();
        String weatherCode = this.weatherService.getWeatherCode(weatherInfo);

        List<Cocktail> cocktails = this.searchService.findCocktailsByWeatherCode(weatherCode);
        this.cachedCocktails = cocktails.stream()
                .map(IndexCocktailDTO::new)
                .collect(Collectors.toList());
    }

    public List<IndexCocktailDTO> getCachedCocktails() {
        return cachedCocktails;
    }
}