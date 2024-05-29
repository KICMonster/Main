package com.monster.luv_cocktail.domain.dto;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;



import lombok.Data;

@XmlRootElement(name = "response")
@Data
public class WeatherDTO {
    private String weather;
    private String temperature;
    private String weatherStatus;
    private String category;
    private double lat;
    private double lon;

    public WeatherDTO() {}

    public WeatherDTO(String weather, String temperature , String category,String weatherStatus) {
        this.weather = weather;
        this.temperature = temperature;
        this.category = category;
        this.weatherStatus = weatherStatus;
    }

}