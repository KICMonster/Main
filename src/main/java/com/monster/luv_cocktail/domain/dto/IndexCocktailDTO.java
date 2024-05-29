package com.monster.luv_cocktail.domain.dto;

import com.monster.luv_cocktail.domain.entity.Cocktail;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IndexCocktailDTO {
    private String name;
    private String ingredient1;
    private String ingredient2;
    private String ingredient3;
    private String imageUrl;

    public IndexCocktailDTO(Cocktail cocktail) {
        this.name = cocktail.getName();
        this.ingredient1 = cocktail.getIngredient1();
        this.ingredient2 = cocktail.getIngredient2();
        this.ingredient3 = cocktail.getIngredient3();
        this.imageUrl = cocktail.getImageUrl();
    }
}
