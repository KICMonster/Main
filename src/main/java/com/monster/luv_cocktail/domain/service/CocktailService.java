package com.monster.luv_cocktail.domain.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.monster.luv_cocktail.domain.dto.CocktailResponse;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CocktailService {

	private final CocktailsRepository cocktailRepository;


	public List<CocktailResponse> getList() {
	    List<Cocktail> cocktails = cocktailRepository.findAll();
	    List<CocktailResponse> response = cocktails.stream()
	            .map(cocktail -> new CocktailResponse(
	            		cocktail.getId(),
	                    cocktail.getName(),
	                    cocktail.getCategory(),
	                    cocktail.getAlcoholic(),
	                    cocktail.getGlass(),
	                    cocktail.getCcl(),
	                    cocktail.getWeather(),
	                    cocktail.getImageUrl(),
	                    cocktail.getTaste(),
	                    cocktail.getInstructions(),
	                    cocktail.getIngredient1(), cocktail.getIngredient2(), cocktail.getIngredient3(), cocktail.getIngredient4(), cocktail.getIngredient5(),
	                    cocktail.getIngredient6(), cocktail.getIngredient7(), cocktail.getIngredient8(), cocktail.getIngredient9(), cocktail.getIngredient10(),
	                    cocktail.getIngredient11(), cocktail.getIngredient12(), cocktail.getIngredient13(), cocktail.getIngredient14(), cocktail.getIngredient15(),
	                    cocktail.getMeasure1(), cocktail.getMeasure2(), cocktail.getMeasure3(), cocktail.getMeasure4(), cocktail.getMeasure5(),
	                    cocktail.getMeasure6(), cocktail.getMeasure7(), cocktail.getMeasure8(), cocktail.getMeasure9(), cocktail.getMeasure10(),
	                    cocktail.getMeasure11(), cocktail.getMeasure12(), cocktail.getMeasure13(), cocktail.getMeasure14(), cocktail.getMeasure15()
	            ))
	            .collect(Collectors.toList());
	    return response;
	}


	public CocktailResponse getOne(Long cocktailId) {
		Cocktail cocktail = cocktailRepository.findById(cocktailId).orElseThrow();
		CocktailResponse response = new CocktailResponse(
	            cocktail.getId(),
	            cocktail.getName(),
	            cocktail.getCategory(),
	            cocktail.getAlcoholic(),
	            cocktail.getGlass(),
	            cocktail.getCcl(),
	            cocktail.getWeather(),
	            cocktail.getImageUrl(),
	            cocktail.getTaste(),
	            cocktail.getInstructions(),
	            cocktail.getIngredient1(), cocktail.getIngredient2(), cocktail.getIngredient3(), cocktail.getIngredient4(), cocktail.getIngredient5(),
	            cocktail.getIngredient6(), cocktail.getIngredient7(), cocktail.getIngredient8(), cocktail.getIngredient9(), cocktail.getIngredient10(),
	            cocktail.getIngredient11(), cocktail.getIngredient12(), cocktail.getIngredient13(), cocktail.getIngredient14(), cocktail.getIngredient15(),
	            cocktail.getMeasure1(), cocktail.getMeasure2(), cocktail.getMeasure3(), cocktail.getMeasure4(), cocktail.getMeasure5(),
	            cocktail.getMeasure6(), cocktail.getMeasure7(), cocktail.getMeasure8(), cocktail.getMeasure9(), cocktail.getMeasure10(),
	            cocktail.getMeasure11(), cocktail.getMeasure12(), cocktail.getMeasure13(), cocktail.getMeasure14(), cocktail.getMeasure15()
	    );
		return response;
	}

}

