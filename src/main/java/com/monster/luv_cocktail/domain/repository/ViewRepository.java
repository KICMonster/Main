package com.monster.luv_cocktail.domain.repository;

import com.monster.luv_cocktail.domain.entity.ViewLog;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewRepository extends JpaRepository<ViewLog, Long>, JpaSpecificationExecutor<ViewLog> {
	List<ViewLog> findAllByCocktailIsNotNull();

	List<ViewLog> findAllByCustomCocktailIsNotNull();

	List<ViewLog> findAllByGender(String gender);

	List<ViewLog> findAllByBirth(String birthYear);
}

