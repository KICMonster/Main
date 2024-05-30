package com.monster.luv_cocktail.domain.service;

import java.io.IOException;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.auth.oauth2.JwtProvider;
import com.monster.luv_cocktail.domain.dto.PutMyPageRequest;
import com.monster.luv_cocktail.domain.dto.PutMyPageResponse;
import com.monster.luv_cocktail.domain.dto.UserInfo;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.ExceptionCode;
import com.monster.luv_cocktail.domain.exception.BusinessLogicException;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyPageService {
	
	
	private final FileUploadService fileUploadService;
	private final JwtService jwtService;
	private final MemberRepository memberRepository;
	
	@Transactional
	public PutMyPageResponse putProfileImage(PutMyPageRequest request, HttpServletRequest requestServlet)
			throws IOException {
		
		Member member = findUserByHeader(requestServlet);
		
		
		PutMyPageResponse response = new PutMyPageResponse();
		String fileUrl;
		
	    if (request.getProfileImage() != null && !request.getProfileImage().isEmpty()) {
	        String filename = UUID.randomUUID().toString() + "_" + request.getProfileImage().getOriginalFilename();
	        fileUrl = fileUploadService.uploadFile(request.getProfileImage(), filename, "monster/profile");
	        member.setProfileImageUrl(fileUrl); // 새 이미지 URL을 유저 엔티티에 저장
	        response.setProfileImageUrl(fileUrl);
	        log.info("New image uploaded successfully: {}", fileUrl);
	    } else {
	    	member.setProfileImageUrl(null);
			response.setProfileImageUrl(null);
//			user.setCreator_image(null); // Set the image URL to null
			log.info("이미지 삭제");
			memberRepository.save(member);
	    }
	    member.setIntroduction(request.getDescription());
		response.setIntroduction(request.getDescription());
		return response;

	}
	
	public Member findUserByHeader(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		String accessToken = bearerToken.substring(7);
		 String email =  jwtService.extractEmailFromToken(accessToken);
		 Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NON_EXISTENT_MEMBER));
		 return member;
	}
}
