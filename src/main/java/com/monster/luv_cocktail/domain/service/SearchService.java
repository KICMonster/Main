package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.CocktailDTO;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchService {
    @Autowired
    private CocktailsRepository cocktailsRepository;

    public SearchService() {
    }

    public List<Cocktail> findCocktailsByWeatherCode(String weatherCode) {
        return this.cocktailsRepository.findByWeatherIn(Collections.singletonList(weatherCode));
    }

    public List<CocktailDTO> getAllCocktails() {
        List<Cocktail> cocktail = this.cocktailsRepository.findAll();
        return (List)cocktail.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private CocktailDTO convertToDTO(Cocktail cocktail) {
        CocktailDTO dto = new CocktailDTO();
        dto.setId(cocktail.getId());
        dto.setName(cocktail.getName());
        dto.setCategory(cocktail.getCategory());
        dto.setAlcoholic(cocktail.getAlcoholic());
        dto.setGlass(cocktail.getGlass());
        dto.setCcl(cocktail.getCcl());
        dto.setWeather(cocktail.getWeather());
        dto.setImageUrl(cocktail.getImageUrl());
        dto.setTaste(cocktail.getTaste());
        dto.setInstructions(cocktail.getInstructions());
        dto.setIngredient1(cocktail.getIngredient1());
        dto.setIngredient2(cocktail.getIngredient2());
        dto.setIngredient3(cocktail.getIngredient3());
        dto.setIngredient4(cocktail.getIngredient4());
        dto.setIngredient5(cocktail.getIngredient5());
        dto.setIngredient6(cocktail.getIngredient6());
        dto.setIngredient7(cocktail.getIngredient7());
        dto.setIngredient8(cocktail.getIngredient8());
        dto.setIngredient9(cocktail.getIngredient9());
        dto.setIngredient10(cocktail.getIngredient10());
        dto.setIngredient11(cocktail.getIngredient11());
        dto.setIngredient12(cocktail.getIngredient12());
        dto.setIngredient13(cocktail.getIngredient13());
        dto.setIngredient14(cocktail.getIngredient14());
        dto.setIngredient15(cocktail.getIngredient15());
        dto.setMeasure1(cocktail.getMeasure1());
        dto.setMeasure2(cocktail.getMeasure2());
        dto.setMeasure3(cocktail.getMeasure3());
        dto.setMeasure4(cocktail.getMeasure4());
        dto.setMeasure5(cocktail.getMeasure5());
        dto.setMeasure6(cocktail.getMeasure6());
        dto.setMeasure7(cocktail.getMeasure7());
        dto.setMeasure8(cocktail.getMeasure8());
        dto.setMeasure9(cocktail.getMeasure9());
        dto.setMeasure10(cocktail.getMeasure10());
        dto.setMeasure11(cocktail.getMeasure11());
        dto.setMeasure12(cocktail.getMeasure12());
        dto.setMeasure13(cocktail.getMeasure13());
        dto.setMeasure14(cocktail.getMeasure14());
        dto.setMeasure15(cocktail.getMeasure15());
        dto.setViewCount((long) cocktail.getViews().size());
        return dto;
    }
}

