package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.service.ViewService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = { "https://localhost:5174" })
@RequestMapping({ "/api/view" })
@RestController
@RequiredArgsConstructor
@Log4j2
public class ViewController {
	
	private final ViewService viewService;


	@PostMapping({ "/cocktails/{id}" })
	public ResponseEntity<Void> updateCocktailViews(@PathVariable("id") Long id,
			@RequestBody Map<String, String> request, HttpServletRequest servletRequest) {

		log.info("updateCoctailView 실행");

		viewService.addViewLog(id, request, servletRequest);
		return ResponseEntity.ok().build();
	}

	@PostMapping({ "/custom/cocktails/{id}" })
	public ResponseEntity<Void> updateCustomCocktailViews(@PathVariable("id") Long id,
			@RequestBody Map<String, String> request, HttpServletRequest servletRequest) {
		
		log.info("updateCustomCoctailView 실행");
		
		viewService.addCustomViewLog(id, request, servletRequest);
		return ResponseEntity.ok().build();
	}
}
