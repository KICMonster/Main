package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.CustomCocktailDTO;
import com.monster.luv_cocktail.domain.entity.CustomCocktail;
import com.monster.luv_cocktail.domain.repository.CustomCocktailRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class CustomCocktailService {

    @Autowired
    private CustomCocktailRepository customCocktailRepository;

    // 모든 칵테일 조회
    public List<CustomCocktailDTO> findAll() {
        return customCocktailRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 특정 ID로 칵테일 조회
    public CustomCocktailDTO findById(Long id) {
        CustomCocktail customCocktail = customCocktailRepository.findById(id).orElse(null);
        return convertToDto(customCocktail);
    }

    // 칵테일 이름으로 검색
    public List<CustomCocktailDTO> findByNameContaining(String name) {
        return customCocktailRepository.findByNameLike(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 칵테일 저장 (생성 및 수정)
    public CustomCocktailDTO save(CustomCocktail customCocktail) {
        CustomCocktail savedCocktail = customCocktailRepository.save(customCocktail);
        return convertToDto(savedCocktail);
    }

    // 기존 칵테일 수정
    public CustomCocktailDTO update(Long id, CustomCocktail customCocktail) {
        CustomCocktail existingCocktail = customCocktailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom Cocktail not found"));
        customCocktail.setId(id);
        CustomCocktail updatedCocktail = customCocktailRepository.save(customCocktail);
        return convertToDto(updatedCocktail);
    }

    // 특정 ID로 칵테일 삭제
    public void deleteById(Long id) {
        customCocktailRepository.deleteById(id);
    }

    private CustomCocktailDTO convertToDto(CustomCocktail customCocktail) {
        CustomCocktailDTO dto = new CustomCocktailDTO();
        dto.setCustomId(customCocktail.getId());
        dto.setCustomNm(customCocktail.getName());
        dto.setCustomRcp(customCocktail.getRecipe());
        if (customCocktail.getMember() != null) {
            dto.setMemberId(customCocktail.getMember().getId());
        } else {
            dto.setMemberId(0L); // 기본값 설정
        }
        dto.setCustomImageUrl(customCocktail.getImageUrl());
        dto.setCustomIngredient1(customCocktail.getIngredient1());
        dto.setCustomIngredient2(customCocktail.getIngredient2());
        dto.setCustomIngredient3(customCocktail.getIngredient3());
        dto.setCustomIngredient4(customCocktail.getIngredient4());
        dto.setCustomIngredient5(customCocktail.getIngredient5());
        dto.setCustomIngredient6(customCocktail.getIngredient6());
        dto.setCustomIngredient7(customCocktail.getIngredient7());
        dto.setCustomIngredient8(customCocktail.getIngredient8());
        dto.setCustomIngredient9(customCocktail.getIngredient9());
        dto.setCustomIngredient10(customCocktail.getIngredient10());
        dto.setCustomIngredient11(customCocktail.getIngredient11());
        dto.setCustomIngredient12(customCocktail.getIngredient12());
        dto.setCustomIngredient13(customCocktail.getIngredient13());
        dto.setCustomIngredient14(customCocktail.getIngredient14());
        dto.setCustomIngredient15(customCocktail.getIngredient15());
        dto.setCustomMeasure1(customCocktail.getMeasure1());
        dto.setCustomMeasure2(customCocktail.getMeasure2());
        dto.setCustomMeasure3(customCocktail.getMeasure3());
        dto.setCustomMeasure4(customCocktail.getMeasure4());
        dto.setCustomMeasure5(customCocktail.getMeasure5());
        dto.setCustomMeasure6(customCocktail.getMeasure6());
        dto.setCustomMeasure7(customCocktail.getMeasure7());
        dto.setCustomMeasure8(customCocktail.getMeasure8());
        dto.setCustomMeasure9(customCocktail.getMeasure9());
        dto.setCustomMeasure10  (customCocktail.getMeasure10());
        dto.setCustomMeasure11(customCocktail.getMeasure11());
        dto.setCustomMeasure12(customCocktail.getMeasure12());
        dto.setCustomMeasure13(customCocktail.getMeasure13());
        dto.setCustomMeasure14(customCocktail.getMeasure14());
        dto.setCustomMeasure15(customCocktail.getMeasure15());
        return dto;
    }
}