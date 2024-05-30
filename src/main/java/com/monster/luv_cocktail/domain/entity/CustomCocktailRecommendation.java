package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "CUSTOM_COCKTAIL_RECOMMENDATION", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"member_id", "custom_id"})
})
public class CustomCocktailRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendationId;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "custom_id", nullable = false)
    private Long customId;
}