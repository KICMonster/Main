package com.monster.luv_cocktail.domain.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.monster.luv_cocktail.domain.dto.SnackDetailResponse;
import com.monster.luv_cocktail.domain.dto.SnackListRequest;
import com.monster.luv_cocktail.domain.dto.SnackListResponse;
import com.monster.luv_cocktail.domain.service.SnackService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
//@CrossOrigin(origins = "https://localhost:5174")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/snack") // 고유한 경로로 수정
public class SnackController {
	
	private final SnackService snackService;

	@GetMapping("/")
	public ResponseEntity<List<SnackListResponse>> getList(@RequestParam("type") Long type) {
		log.info("GET Snack List 메서드 실행");
		log.info("request.getType : " + type);
		return ResponseEntity.ok(snackService.getSnackList(type));
	}
	
	@GetMapping("/{snackId}")
	public ResponseEntity<SnackDetailResponse> getOne(@PathVariable("snackId") Long snackId) {
		log.info("getOne 메서드 실행");
		return ResponseEntity.ok(snackService.getSnackDetail(snackId));
	}
}
	