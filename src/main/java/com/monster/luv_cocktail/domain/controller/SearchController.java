package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.CocktailDTO;
import com.monster.luv_cocktail.domain.dto.CocktailResponse;
import com.monster.luv_cocktail.domain.dto.CocktailSummaryDTO;
import com.monster.luv_cocktail.domain.dto.SearchCocktailRequest;
import com.monster.luv_cocktail.domain.dto.TasteStringDTO;
import com.monster.luv_cocktail.domain.dto.TimeRangeAndCategoryRequest;
import com.monster.luv_cocktail.domain.dto.TimeRangeRequest;
import com.monster.luv_cocktail.domain.dto.TimeSlotDTO;
import com.monster.luv_cocktail.domain.dto.ViewDTO;
import com.monster.luv_cocktail.domain.dto.ViewLogDTO;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.entity.ViewLog;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import com.monster.luv_cocktail.domain.repository.ViewRepository;
import com.monster.luv_cocktail.domain.service.JwtService;
import com.monster.luv_cocktail.domain.service.MemberService;
import com.monster.luv_cocktail.domain.service.SearchService;
import com.monster.luv_cocktail.domain.service.ViewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = { "https://localhost:5174" })
@RequestMapping({ "/api/search" })
@Log4j2
@RestController
@RequiredArgsConstructor
public class SearchController {
//	@Autowired
	private final MemberService memberService;
//	@Autowired
	private final JwtService jwtService;
//	@Autowired
	private final MemberRepository memberRepository;
//	@Autowired
	private final SearchService searchService;
//	@Autowired
//	private final CocktailsRepository cocktailsRepository;
//	@Autowired
	private final ViewRepository viewRepository;
//
	private final ViewService viewService;
//	public SearchController() {
//	}

	@PreAuthorize("hasAuthority('USER')")
	@PostMapping({ "/recommend" })
	@Operation(summary = "취향조사 결과 반환", description = "취향조사에 대한 결과를 반환합니다")
	public ResponseEntity<List<Cocktail>> updateTasteAndRecommend(@RequestHeader("Authorization") String jwtToken,
			@RequestBody TasteStringDTO tasteString) {
		if (jwtToken != null && jwtToken.startsWith("Bearer ")) {
			jwtToken = jwtToken.substring(7);
		}

		if (!this.jwtService.validateToken(jwtToken)) {
			throw new IllegalArgumentException("Invalid JWT token");
		} else {
			String taste = tasteString.getTasteString();
			System.out.println("taste " + taste);
			System.out.println("jwtToken: " + jwtToken);
			String email = this.jwtService.extractEmailFromToken(jwtToken);
			Member member = (Member) this.memberRepository.findByEmail(email).orElseThrow(() -> {
				return new IllegalArgumentException("Member not found for email: " + email);
			});
			member.setTaste(tasteString.toString());
			this.memberRepository.save(member);
			List<String> tasteIds = Arrays.asList(tasteString.getTasteString().split("\\."));
			List<Cocktail> recommendedCocktails = this.memberService.findCocktailsByTaste(tasteIds);
			System.out.println("추천 칵테일: " + recommendedCocktails);
			return ResponseEntity.ok(recommendedCocktails);
		}
	}

 
//	@PostMapping({ "/chart1" })
//    public ResponseEntity<List<CocktailSummaryDTO>> getCocktailsByTimeRangeAndCategory(@RequestBody TimeRangeAndCategoryRequest request) {
//        List<CocktailSummaryDTO> summaries = viewService.getCocktailViewsByTimeRangeAndCategory(
//            request.getStart(), request.getEnd(), request.getCategory(), request.getGender(), request.getBirth());
//        return ResponseEntity.ok(summaries);
//    }

    @PostMapping("/chart")
    public ResponseEntity<List<ViewLogDTO>> getViewLogsByTimeRangeAndCategory(@RequestBody TimeRangeAndCategoryRequest request) {
        List<ViewLogDTO> logs = viewService.getViewLogsByTimeRangeAndCategory(
            request.getStart(), request.getEnd(), request.getCategory(), request.getGender(), request.getBirth());
        return ResponseEntity.ok(logs);
    }

	@GetMapping("/")
	public ResponseEntity<List<CocktailResponse>> getListByName(@RequestParam("name") String name) {
		log.info("getListByName 메서드 실행");
		return ResponseEntity.ok(searchService.getListByName(name));
	}
	
//	private List<TimeSlotDTO> convertToTimeSlotDTOs(List<ViewLog> views) {
//	    // 시간대별로 ViewLog 데이터를 그룹화
//	    Map<Integer, List<ViewLog>> groupedByHour = views.stream()
//	        .collect(Collectors.groupingBy(view -> view.getViewDate().getHour()));
//
//	    // 각 그룹을 TimeSlotDTO로 변환
//	    List<TimeSlotDTO> timeSlotDTOs = new ArrayList<>();
//	    for (Map.Entry<Integer, List<ViewLog>> entry : groupedByHour.entrySet()) {
//	        int hour = entry.getKey();
//	        List<ViewLog> hourViews = entry.getValue();
//	        int viewCount = hourViews.size();  // 해당 시간대의 조회 수
//	        List<String> cocktailNames = hourViews.stream()
//	            .map(view -> {
//	                // 칵테일 이름을 추출, CustomCocktail과 Cocktail 모두 고려
//	                if (view.getCocktail() != null) {
//	                    return view.getCocktail().getName();
//	                } else if (view.getCustomCocktail() != null) {
//	                    return view.getCustomCocktail().getName();
//	                }
//	                return "Unknown Cocktail"; // 이름이 없는 경우 대비
//	            })
//	            .distinct()  // 중복 이름 제거
//	            .collect(Collectors.toList());
//
//	        // DTO 생성 및 리스트 추가
//	        TimeSlotDTO dto = new TimeSlotDTO();
//	        dto.setHour(hour);
//	        dto.setViewCount(viewCount);
//	        dto.setCocktailNames(cocktailNames);
//	        timeSlotDTOs.add(dto);
//	    }
//
//	    return timeSlotDTOs;
//	}
}
