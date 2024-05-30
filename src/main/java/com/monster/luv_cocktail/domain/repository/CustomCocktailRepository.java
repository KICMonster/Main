package com.monster.luv_cocktail.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.monster.luv_cocktail.domain.entity.CustomCocktail;

public interface CustomCocktailRepository extends JpaRepository<CustomCocktail, Long> {
    List<CustomCocktail> findByNameLike(String name);

}