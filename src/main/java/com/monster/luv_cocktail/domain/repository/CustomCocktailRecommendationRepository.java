package com.monster.luv_cocktail.domain.repository;

import com.monster.luv_cocktail.domain.entity.CustomCocktailRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomCocktailRecommendationRepository extends JpaRepository<CustomCocktailRecommendation, Long> {
    boolean existsByMemberIdAndCustomId(Long memberId, Long customId);
    long countByCustomId(Long customId);
}