package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.CustomCocktailDTO;
import com.monster.luv_cocktail.domain.dto.CustomCocktailListResponse;
import com.monster.luv_cocktail.domain.dto.PostCustomCocktailRequest;
import com.monster.luv_cocktail.domain.dto.PostCustomCocktailResponse;
import com.monster.luv_cocktail.domain.entity.CustomCocktail;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.ExceptionCode;
import com.monster.luv_cocktail.domain.exception.BusinessLogicException;
import com.monster.luv_cocktail.domain.repository.CustomCocktailRecommendationRepository;
import com.monster.luv_cocktail.domain.repository.CustomCocktailRepository;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CustomCocktailService {

	private final CustomCocktailRecommendationRepository recommendationRepository;
    private final CustomCocktailRepository customCocktailRepository;
	private final FileUploadService fileUploadService;
	private final JwtService jwtService;
	private final MemberRepository memberRepository;
    
    // 칵테일 저장 (생성 및 수정)
    @Transactional
    public PostCustomCocktailResponse save(PostCustomCocktailRequest request,  HttpServletRequest servletRequest) throws IOException {
    	log.info("save 시작");
    	// Author 등록
    	Member member = findUserByHeader(servletRequest);
    	// 칵테일 생성
    	CustomCocktail cocktail = mapping(request,servletRequest,member);

    	// 이미지 업로드 밑 입력
    	
//    	// 응답 생성
    	PostCustomCocktailResponse response = new PostCustomCocktailResponse();
    	response.setCocktailId(cocktail.getId());
    	log.info("cocktailId : {}", cocktail.getId());
    	// DTO 매핑해서, id값만 반환
    	log.info("save 성공");
        return response;	
    }
    
    
    // 모든 칵테일 조회
    public List<CustomCocktailListResponse> findAll() {
//    	CustomCocktailListResponse customCocktailListResponse = new CustomCocktailListResponse();
    	List<CustomCocktail> cocktailList = customCocktailRepository.findAll();
		List<CustomCocktailListResponse> responseList = cocktailList.stream()
				.map(cocktail -> {
					CustomCocktailListResponse response = new CustomCocktailListResponse();
					// 매핑
					response.setCocktailId(cocktail.getId());
					response.setImageUrl(cocktail.getImageUrl());
					response.setName(cocktail.getName());
					response.setRecommend(recommendationRepository.countByCustomId(cocktail.getId()));
					response.setView(cocktail.getView());
					return response;
				}).collect(Collectors.toList());
		return responseList;
    }

    // 특정 ID로 칵테일 조회
    @Transactional
    public CustomCocktailDTO findById(Long id) {
        CustomCocktail customCocktail = customCocktailRepository.findById(id).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NON_EXISTENT_COCKTAIL));
        customCocktail.setView(customCocktail.getView() + 1);
        customCocktailRepository.save(customCocktail);
        // 저장 하고 변환해야함
        return convertToDto(customCocktail);
    }

    // 칵테일 이름으로 검색
    public List<CustomCocktailDTO> findByNameContaining(String name) {
        return customCocktailRepository.findByNameLike(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }



    @Transactional
    public CustomCocktail mapping(PostCustomCocktailRequest request, HttpServletRequest servletRequest, Member member) throws IOException {
    	
    	CustomCocktail cocktail = new CustomCocktail();
    	cocktail.setName(request.getName());
    	cocktail.setMember(member);
    	cocktail.setAlcoholic(request.getAlcoholic());
    	cocktail.setGlass(request.getGlass());
    	cocktail.setRecipe(request.getDescription());
    	cocktail.setView(0);
    	cocktail.setIngredient1(request.getIngredient1());
    	cocktail.setIngredient2(request.getIngredient2());
    	cocktail.setIngredient3(request.getIngredient3());
    	cocktail.setIngredient4(request.getIngredient4());
    	cocktail.setIngredient5(request.getIngredient5());
    	cocktail.setIngredient6(request.getIngredient6());
    	cocktail.setIngredient7(request.getIngredient7());
    	cocktail.setIngredient8(request.getIngredient8());
    	cocktail.setIngredient9(request.getIngredient9());
    	cocktail.setIngredient10(request.getIngredient10());
    	cocktail.setIngredient11(request.getIngredient11());
    	cocktail.setIngredient12(request.getIngredient12());
    	cocktail.setIngredient13(request.getIngredient13());
    	cocktail.setIngredient14(request.getIngredient14());
    	cocktail.setIngredient15(request.getIngredient15());
    	cocktail.setMeasure1(request.getMeasure1());
    	cocktail.setMeasure2(request.getMeasure2());
    	cocktail.setMeasure3(request.getMeasure3());
    	cocktail.setMeasure4(request.getMeasure4());
    	cocktail.setMeasure5(request.getMeasure5());
    	cocktail.setMeasure6(request.getMeasure6());
    	cocktail.setMeasure7(request.getMeasure7());
    	cocktail.setMeasure8(request.getMeasure8());
    	cocktail.setMeasure9(request.getMeasure9());
    	cocktail.setMeasure10(request.getMeasure10());
    	cocktail.setMeasure11(request.getMeasure11());
    	cocktail.setMeasure12(request.getMeasure12());
    	cocktail.setMeasure13(request.getMeasure13());
    	cocktail.setMeasure14(request.getMeasure14());
    	cocktail.setMeasure15(request.getMeasure15());
    	
    	cocktail.setImageUrl(postImage(request.getImage(), servletRequest, cocktail));
    	customCocktailRepository.save(cocktail);
    	return cocktail;
    }
    
    
    // 기존 칵테일 수정
    @Transactional
    public CustomCocktailDTO update(Long id, CustomCocktail customCocktail) {
        CustomCocktail existingCocktail = customCocktailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Custom Cocktail not found"));
        customCocktail.setId(id);
        CustomCocktail updatedCocktail = customCocktailRepository.save(customCocktail);
        return convertToDto(updatedCocktail);
    }

    // 특정 ID로 칵테일 삭제
    @Transactional
    public void deleteById(Long id) {
        customCocktailRepository.deleteById(id);
    }

    @Transactional
    private CustomCocktailDTO convertToDto(CustomCocktail customCocktail) {
        CustomCocktailDTO dto = new CustomCocktailDTO();
        
        dto.setCocktailId(customCocktail.getId());
        dto.setCustomNm(customCocktail.getName());
        dto.setCustomRcp(customCocktail.getRecipe());
        if (customCocktail.getMember() != null) {
            dto.setMemberId(customCocktail.getMember().getId());
        } else {
            dto.setMemberId(0L); // 기본값 설정
        }
        dto.setCustomImageUrl(customCocktail.getImageUrl());
        dto.setCustomIngredient1(customCocktail.getIngredient1());
        dto.setCustomIngredient2(customCocktail.getIngredient2());
        dto.setCustomIngredient3(customCocktail.getIngredient3());
        dto.setCustomIngredient4(customCocktail.getIngredient4());
        dto.setCustomIngredient5(customCocktail.getIngredient5());
        dto.setCustomIngredient6(customCocktail.getIngredient6());
        dto.setCustomIngredient7(customCocktail.getIngredient7());
        dto.setCustomIngredient8(customCocktail.getIngredient8());
        dto.setCustomIngredient9(customCocktail.getIngredient9());
        dto.setCustomIngredient10(customCocktail.getIngredient10());
        dto.setCustomIngredient11(customCocktail.getIngredient11());
        dto.setCustomIngredient12(customCocktail.getIngredient12());
        dto.setCustomIngredient13(customCocktail.getIngredient13());
        dto.setCustomIngredient14(customCocktail.getIngredient14());
        dto.setCustomIngredient15(customCocktail.getIngredient15());
        dto.setCustomMeasure1(customCocktail.getMeasure1());
        dto.setCustomMeasure2(customCocktail.getMeasure2());
        dto.setCustomMeasure3(customCocktail.getMeasure3());
        dto.setCustomMeasure4(customCocktail.getMeasure4());
        dto.setCustomMeasure5(customCocktail.getMeasure5());
        dto.setCustomMeasure6(customCocktail.getMeasure6());
        dto.setCustomMeasure7(customCocktail.getMeasure7());
        dto.setCustomMeasure8(customCocktail.getMeasure8());
        dto.setCustomMeasure9(customCocktail.getMeasure9());
        dto.setCustomMeasure10  (customCocktail.getMeasure10());
        dto.setCustomMeasure11(customCocktail.getMeasure11());
        dto.setCustomMeasure12(customCocktail.getMeasure12());
        dto.setCustomMeasure13(customCocktail.getMeasure13());
        dto.setCustomMeasure14(customCocktail.getMeasure14());
        dto.setCustomMeasure15(customCocktail.getMeasure15());
        dto.setView(customCocktail.getView());
        return dto;
    }
    
	@Transactional
	public String postImage(MultipartFile image, HttpServletRequest requestServlet, CustomCocktail cocktail)
			throws IOException {
		
		String imageUrl;
		String fileUrl;
		
	    if (image != null && !image.isEmpty()) {
	        String filename = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
	        fileUrl = fileUploadService.uploadFile(image, filename, "monster/customCocktail");
	        cocktail.setImageUrl(fileUrl); // 새 이미지 URL을 유저 엔티티에 저장
	        imageUrl = fileUrl;
	        log.info("New image uploaded successfully: {}", fileUrl);
			customCocktailRepository.save(cocktail);

	    } else {
	    	cocktail.setImageUrl(null);
	    	imageUrl = null;
			log.info("이미지 삭제");
			customCocktailRepository.save(cocktail);
	    }
		return imageUrl;

	}
	
	 @Transactional
	public Member findUserByHeader(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		String accessToken = bearerToken.substring(7);
		 String email =  jwtService.extractEmailFromToken(accessToken);
		 Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NON_EXISTENT_MEMBER));
		 return member;
	}
}