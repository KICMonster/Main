package com.monster.luv_cocktail.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CocktailSummaryDTO {

    public CocktailSummaryDTO(String name, int viewCount) {
        this.name = name;
        this.viewCount = viewCount;
    }
	private String name;
	private int viewCount;
}
