package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.entity.CustomCocktailRecommendation;
import com.monster.luv_cocktail.domain.repository.CustomCocktailRecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomCocktailRecommendationService {

    @Autowired
    private CustomCocktailRecommendationRepository recommendationRepository;

    public boolean hasRecommended(Long memberId, Long customId) {
        return recommendationRepository.existsByMemberIdAndCustomId(memberId, customId);
    }

    @Transactional
    public void addRecommendation(Long memberId, Long customId) {
        if (!hasRecommended(memberId, customId)) {
            CustomCocktailRecommendation recommendation = new CustomCocktailRecommendation();
            recommendation.setMemberId(memberId);
            recommendation.setCustomId(customId);
            recommendationRepository.save(recommendation);
        } else {
            throw new IllegalArgumentException("Recommendation already exists");
        }
    }

    public long getRecommendationCount(Long customId) {
        return recommendationRepository.countByCustomId(customId);
    }
}