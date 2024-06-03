package com.monster.luv_cocktail.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomCocktailDTO {
    private String customNm;
    private String customRcp;
    private long memberId;
    private String customImageUrl;
    private String customIngredient1;
    private String customIngredient2;
    private String customIngredient3;
    private String customIngredient4;
    private String customIngredient5;
    private String customIngredient6;
    private String customIngredient7;
    private String customIngredient8;
    private String customIngredient9;
    private String customIngredient10;
    private String customIngredient11;
    private String customIngredient12;
    private String customIngredient13;
    private String customIngredient14;
    private String customIngredient15;
    private String customMeasure1;
    private String customMeasure2;
    private String customMeasure3;
    private String customMeasure4;
    private String customMeasure5;
    private String customMeasure6;
    private String customMeasure7;
    private String customMeasure8;
    private String customMeasure9;
    private String customMeasure10;
    private String customMeasure11;
    private String customMeasure12;
    private String customMeasure13;
    private String customMeasure14;
    private String customMeasure15;
    private Long cocktailId;
    
    
    private int view;
    private String alcoholic;
    private String glass;
    private int recommend;
    @JsonProperty(value = "isAuthor")
    private boolean isAuthor;
    
}