package com.monster.luv_cocktail.domain.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "CUSTOM_COCKTAIL")
public class CustomCocktail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CUSTOM_ID", nullable = false)
    private Long id;

    @Column(name = "CUSTOM_NM", nullable = false, length = 255)
    private String name;

    @Column(name = "CUSTOM_RCP", nullable = false, length = 255)
    private String recipe;

    @Column(name = "CUSTOM_IMAGE_URL", nullable = true, length = 255)
    private String imageUrl;

    @Column(name = "CUSTOM_INGREDIENT1", nullable = true, length = 255)
    private String ingredient1;

    @Column(name = "CUSTOM_INGREDIENT2", nullable = true, length = 255)
    private String ingredient2;

    @Column(name = "CUSTOM_INGREDIENT3", nullable = true, length = 255)
    private String ingredient3;

    @Column(name = "CUSTOM_INGREDIENT4", nullable = true, length = 255)
    private String ingredient4;

    @Column(name = "CUSTOM_INGREDIENT5", nullable = true, length = 255)
    private String ingredient5;

    @Column(name = "CUSTOM_INGREDIENT6", nullable = true, length = 255)
    private String ingredient6;

    @Column(name = "CUSTOM_INGREDIENT7", nullable = true, length = 255)
    private String ingredient7;

    @Column(name = "CUSTOM_INGREDIENT8", nullable = true, length = 255)
    private String ingredient8;

    @Column(name = "CUSTOM_INGREDIENT9", nullable = true, length = 255)
    private String ingredient9;

    @Column(name = "CUSTOM_INGREDIENT10", nullable = true, length = 255)
    private String ingredient10;

    @Column(name = "CUSTOM_INGREDIENT11", nullable = true, length = 255)
    private String ingredient11;

    @Column(name = "CUSTOM_INGREDIENT12", nullable = true, length = 255)
    private String ingredient12;

    @Column(name = "CUSTOM_INGREDIENT13", nullable = true, length = 255)
    private String ingredient13;

    @Column(name = "CUSTOM_INGREDIENT14", nullable = true, length = 255)
    private String ingredient14;

    @Column(name = "CUSTOM_INGREDIENT15", nullable = true, length = 255)
    private String ingredient15;

    @Column(name = "CUSTOM_MEASURE1", nullable = true, length = 255)
    private String measure1;

    @Column(name = "CUSTOM_MEASURE2", nullable = true, length = 255)
    private String measure2;

    @Column(name = "CUSTOM_MEASURE3", nullable = true, length = 255)
    private String measure3;

    @Column(name = "CUSTOM_MEASURE4", nullable = true, length = 255)
    private String measure4;

    @Column(name = "CUSTOM_MEASURE5", nullable = true, length = 255)
    private String measure5;

    @Column(name = "CUSTOM_MEASURE6", nullable = true, length = 255)
    private String measure6;

    @Column(name = "CUSTOM_MEASURE7", nullable = true, length = 255)
    private String measure7;

    @Column(name = "CUSTOM_MEASURE8", nullable = true, length = 255)
    private String measure8;

    @Column(name = "CUSTOM_MEASURE9", nullable = true, length = 255)
    private String measure9;

    @Column(name = "CUSTOM_MEASURE10", nullable = true, length = 255)
    private String measure10;

    @Column(name = "CUSTOM_MEASURE11", nullable = true, length = 255)
    private String measure11;

    @Column(name = "CUSTOM_MEASURE12", nullable = true, length = 255)
    private String measure12;

    @Column(name = "CUSTOM_MEASURE13", nullable = true, length = 255)
    private String measure13;

    @Column(name = "CUSTOM_MEASURE14", nullable = true, length = 255)
    private String measure14;

    @Column(name = "CUSTOM_MEASURE15", nullable = true, length = 255)
    private String measure15;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;
    
    @Column(name = "CUSTOM_VIEW")
    private int view;

    @OneToMany(mappedBy = "customCocktail", cascade = CascadeType.ALL)
    private List<ViewLog> views = new ArrayList<>();
    
    @Column(name = "CUSTOM_ALCOHOLIC", nullable = false)
    private String alcoholic;
    
    @Column(name = "CUSTOM_GLASS", nullable = false)
    private String glass;
}
