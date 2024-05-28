package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "WEATHER")
public class Weather {

    @Id
    @Column(name = "WEATHER_ID", nullable = false)
    private String weatherId;

    @Column(name = "WEATHER_CATEGORY", nullable = false, length = 5)
    private String weatherCategory;

    @Column(name = "WEATHER_STATUS", nullable = false, length = 10)
    private String weatherStatus;
}