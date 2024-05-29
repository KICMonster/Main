package com.monster.luv_cocktail.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.monster.luv_cocktail.domain.entity.Snack;

public interface SnackRepository extends JpaRepository<Snack, Long> {

	List<Snack> findAllByType(Long type);


}
