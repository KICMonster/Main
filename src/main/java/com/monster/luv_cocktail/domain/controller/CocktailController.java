package com.monster.luv_cocktail.domain.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monster.luv_cocktail.domain.dto.CocktailResponse;
import com.monster.luv_cocktail.domain.service.CocktailService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
//@CrossOrigin(origins = "https://localhost:5174")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/cocktail") // 고유한 경로로 수정
public class CocktailController {
	
	private final CocktailService cocktailService;

	@GetMapping("")
	public ResponseEntity<List<CocktailResponse>> getList() {
		log.info("getList 메서드 실행");
		return ResponseEntity.ok(cocktailService.getList());
	}
	
	@GetMapping("/{cocktailId}")
	public ResponseEntity<CocktailResponse> getOne(@PathVariable("cocktailId") Long cocktailId) {
		log.info("getOne 메서드 실행");
		return ResponseEntity.ok(cocktailService.getOne(cocktailId));
	}
}
