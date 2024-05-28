package com.monster.luv_cocktail.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class DataDTO {
    @NotNull
    private Long idDrink;

    private String strDrink;
    private String strDrinkAlternate;
    private String strTags;
    private String strVideo;
    private String strCategory;
    private String strIBA;
    private String strAlcoholic;
    private String strGlass;
    private String strInstructions;
    private String strDrinkThumb;
    private String strIngredient1;
    private String strIngredient2;
    private String strIngredient3;
    private String strIngredient4;
    private String strIngredient5;
    private String strIngredient6;
    private String strIngredient7;
    private String strIngredient8;
    private String strIngredient9;
    private String strIngredient10;
    private String strIngredient11;
    private String strIngredient12;
    private String strIngredient13;
    private String strIngredient14;
    private String strIngredient15;
    private String strMeasure1;
    private String strMeasure2;
    private String strMeasure3;
    private String strMeasure4;
    private String strMeasure5;
    private String strMeasure6;
    private String strMeasure7;
    private String strMeasure8;
    private String strMeasure9;
    private String strMeasure10;
    private String strMeasure11;
    private String strMeasure12;
    private String strMeasure13;
    private String strMeasure14;
    private String strMeasure15;
    private String strImageSource;
    private String strImageAttribution;
    private String strCreativeCommonsConfirmed;
    private LocalDateTime dateModified;
    private String strRecommend;
}
