package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "COCKTAIL")
public class Cocktail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COCKTAIL_ID")
    private Long id;

    @Column(name = "COCKTAIL_NAME")
    private String name;

    @Column(name = "COCKTAIL_CATEGORY")
    private String category;

    @Column(name = "COCKTAIL_ALCOHOLIC")
    private String alcoholic;

    @Column(name = "COCKTAIL_GLASS")
    private String glass;

    @Column(name = "CCL")
    private String ccl;

    @Column(name = "RC_WEATHER")
    private String weather;

    @Column(name = "COCKTAIL_IMAGE_URL")
    private String imageUrl;

    @Column(name = "RC_TASTE")
    private String taste;

    @Column(name = "COCKTAIL_INSTRUCTIONS", length = 2000)
    private String instructions;

    @Column(name = "COCKTAIL_INGREDIENT1")
    private String ingredient1;

    @Column(name = "COCKTAIL_INGREDIENT2")
    private String ingredient2;

    @Column(name = "COCKTAIL_INGREDIENT3")
    private String ingredient3;

    @Column(name = "COCKTAIL_INGREDIENT4")
    private String ingredient4;

    @Column(name = "COCKTAIL_INGREDIENT5")
    private String ingredient5;

    @Column(name = "COCKTAIL_INGREDIENT6")
    private String ingredient6;

    @Column(name = "COCKTAIL_INGREDIENT7")
    private String ingredient7;

    @Column(name = "COCKTAIL_INGREDIENT8")
    private String ingredient8;

    @Column(name = "COCKTAIL_INGREDIENT9")
    private String ingredient9;

    @Column(name = "COCKTAIL_INGREDIENT10")
    private String ingredient10;

    @Column(name = "COCKTAIL_INGREDIENT11")
    private String ingredient11;

    @Column(name = "COCKTAIL_INGREDIENT12")
    private String ingredient12;

    @Column(name = "COCKTAIL_INGREDIENT13")
    private String ingredient13;

    @Column(name = "COCKTAIL_INGREDIENT14")
    private String ingredient14;

    @Column(name = "COCKTAIL_INGREDIENT15")
    private String ingredient15;

    @Column(name = "COCKTAIL_MEASURE1")
    private String measure1;

    @Column(name = "COCKTAIL_MEASURE2")
    private String measure2;

    @Column(name = "COCKTAIL_MEASURE3")
    private String measure3;

    @Column(name = "COCKTAIL_MEASURE4")
    private String measure4;

    @Column(name = "COCKTAIL_MEASURE5")
    private String measure5;

    @Column(name = "COCKTAIL_MEASURE6")
    private String measure6;

    @Column(name = "COCKTAIL_MEASURE7")
    private String measure7;

    @Column(name = "COCKTAIL_MEASURE8")
    private String measure8;

    @Column(name = "COCKTAIL_MEASURE9")
    private String measure9;

    @Column(name = "COCKTAIL_MEASURE10")
    private String measure10;

    @Column(name = "COCKTAIL_MEASURE11")
    private String measure11;

    @Column(name = "COCKTAIL_MEASURE12")
    private String measure12;

    @Column(name = "COCKTAIL_MEASURE13")
    private String measure13;

    @Column(name = "COCKTAIL_MEASURE14")
    private String measure14;

    @Column(name = "COCKTAIL_MEASURE15")
    private String measure15;

    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL)
    private List<ViewLog> views = new ArrayList<>();
}