package com.monster.luv_cocktail.domain.controller;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.monster.luv_cocktail.domain.dto.SearchResponse;
import com.monster.luv_cocktail.domain.service.GisService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gis")
public class GisController {

	private final GisService gisService;

	@GetMapping("")
	public ResponseEntity<SearchResponse> create(@RequestParam("latitude") double latitude, @RequestParam("longitude") double longitude) throws Exception {
		return gisService.getPlaceInfo(latitude, longitude);
	}
}