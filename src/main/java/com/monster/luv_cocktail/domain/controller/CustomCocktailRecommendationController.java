package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.service.CustomCocktailRecommendationService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class CustomCocktailRecommendationController {

    @Autowired
    private CustomCocktailRecommendationService recommendationService;

    @GetMapping("/check")
    public ResponseEntity<Boolean> checkRecommendation(@RequestParam Long memberId, @RequestParam Long customId) {
        boolean recommended = recommendationService.hasRecommended(memberId, customId);
        return ResponseEntity.ok(recommended);
    }

    @PostMapping("/add")
    public ResponseEntity<Long> addRecommendation(@RequestBody RecommendationRequest request) {
        recommendationService.addRecommendation(request.getMemberId(), request.getCustomId());
        long newCount = recommendationService.getRecommendationCount(request.getCustomId());
        return ResponseEntity.ok(newCount);
    }
}

@Data
class RecommendationRequest {
    private Long memberId;
    private Long customId;
}