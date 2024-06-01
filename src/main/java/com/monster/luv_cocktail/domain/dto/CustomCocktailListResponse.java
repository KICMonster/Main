package com.monster.luv_cocktail.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomCocktailListResponse {

	private String name;
	private String imageUrl;
	private int view;
	private Long cocktailId;
	private Long recommend;
	
	
}
