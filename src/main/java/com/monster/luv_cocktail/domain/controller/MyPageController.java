package com.monster.luv_cocktail.domain.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.monster.luv_cocktail.domain.dto.ImageRequest;
import com.monster.luv_cocktail.domain.dto.ImageResponse;
import com.monster.luv_cocktail.domain.service.MyPageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
//@CrossOrigin(origins = "http://reactserver")
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/myPage")
public class MyPageController {
	
	private final MyPageService myPageService;
	
	@PutMapping(value = "/profileImage", consumes = "multipart/form-data")
	@Secured({"ROLE_USER", "ROLE_ADMIN", "ROLE_CREATOR"})
	@Operation(summary = "프로필 이미지 수정", description = "프로필 이미지를 수정합니다")
	@ApiResponse(responseCode="200", description="성공")
	@ApiResponse(responseCode="400", description="에러")
	public ResponseEntity<ImageResponse> putProfileImage(@ModelAttribute ImageRequest request, HttpServletRequest requestServlet) throws IOException {
		return ResponseEntity.ok(myPageService.putProfileImage(request, requestServlet));
	}
	

}
