package com.monster.luv_cocktail.domain.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.monster.luv_cocktail.domain.dto.ImageRequest;
import com.monster.luv_cocktail.domain.dto.ImageResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageService {
	
	
	private final FileUploadService fileUploadService;
	
	@Transactional
	public ImageResponse putProfileImage(ImageRequest request, HttpServletRequest requestServlet)
			throws IOException {
		
//		User user = findUserByHeader(requestServlet);
		
		
		ImageResponse response = new ImageResponse();
		String fileUrl;
		
	    if (request.getImage() != null && !request.getImage().isEmpty()) {
	        String filename = UUID.randomUUID().toString() + "_" + request.getImage().getOriginalFilename();
	        fileUrl = fileUploadService.uploadFile(request.getImage(), filename, "monster/profile");
	        response.setImage(fileUrl);
	        log.info("New image uploaded successfully: {}", fileUrl);
	    } else {
	    	response.setImage(null); // 이미지 제거 시 null 설정
	        log.info("이미지 삭제");
	    }
	    
		return response;

	}
}
