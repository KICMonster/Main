package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.CustomCocktailDTO;
import com.monster.luv_cocktail.domain.dto.CustomCocktailListResponse;
import com.monster.luv_cocktail.domain.dto.GetCustomCocktailResponse;
import com.monster.luv_cocktail.domain.dto.PostCustomCocktailRequest;
import com.monster.luv_cocktail.domain.dto.PostCustomCocktailResponse;
import com.monster.luv_cocktail.domain.entity.CustomCocktail;
import com.monster.luv_cocktail.domain.repository.CustomCocktailRepository;
import com.monster.luv_cocktail.domain.service.CustomCocktailService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/custom")
@RequiredArgsConstructor
public class CustomCocktailController {

    private static final Logger log = LoggerFactory.getLogger(CustomCocktailController.class);

    private final CustomCocktailService customCocktailService;
	
    
    // 칵테일 생성
    @PostMapping("")
    public ResponseEntity<PostCustomCocktailResponse> createCustomCocktail(@ModelAttribute PostCustomCocktailRequest request, HttpServletRequest servletRequest) throws IOException {
    	log.info("save 컨트롤러 시작");
    	PostCustomCocktailResponse savedCocktail = customCocktailService.save(request, servletRequest);
    	log.info("save 컨트롤러 종료");
        return ResponseEntity.ok(savedCocktail);
    }
    
    // 칵테일 id값으로 검색
    @GetMapping("/{cocktailId}")
    public ResponseEntity<CustomCocktailDTO> getOne(@PathVariable("cocktailId") Long cocktailId, HttpServletRequest servletRequest) {
    	log.info("Get CustomCocktail with Id {}", cocktailId);
    	CustomCocktailDTO cocktail = customCocktailService.findById(cocktailId, servletRequest);
    	return ResponseEntity.ok(cocktail);
    }
    
    // 모든 칵테일 조회
    @GetMapping("")
    public ResponseEntity<List<CustomCocktailListResponse>> getAllCustomCocktails() {
    	List<CustomCocktailListResponse> cocktails = customCocktailService.findAll();
        log.info("Retrieved {} custom cocktails", cocktails.size());
        return ResponseEntity.ok(cocktails);
    }

    // 칵테일 이름으로 검색
    @GetMapping("/name/search/")
    public ResponseEntity<List<CustomCocktailDTO>> searchCustomCocktailsByName(@RequestParam("name") String name) {
        log.info("@@@Searching custom cocktail with name {}", name);
        List<CustomCocktailDTO> cocktails = customCocktailService.findByNameContaining(name);
        return ResponseEntity.ok(cocktails);
    }





    // 기존 칵테일 수정
    @PutMapping("/{cocktailId}")
    public ResponseEntity<PostCustomCocktailResponse> updateCustomCocktail(@PathVariable("cocktailId") Long cocktailId, @ModelAttribute PostCustomCocktailRequest request, HttpServletRequest servletRequest) throws IOException {
    	PostCustomCocktailResponse response = customCocktailService.update(cocktailId, request, servletRequest);
    	return ResponseEntity.ok(response);
    }
    // 특정 ID로 칵테일 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomCocktail(@PathVariable Long id) {
        log.info("Delete Cocktail id{}", id);
        customCocktailService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}