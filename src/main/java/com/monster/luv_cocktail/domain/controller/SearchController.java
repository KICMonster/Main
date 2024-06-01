package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.CocktailDTO;
import com.monster.luv_cocktail.domain.dto.CocktailResponse;
import com.monster.luv_cocktail.domain.dto.SearchCocktailRequest;
import com.monster.luv_cocktail.domain.dto.TasteStringDTO;
import com.monster.luv_cocktail.domain.dto.TimeRangeRequest;
import com.monster.luv_cocktail.domain.dto.TimeSlotDTO;
import com.monster.luv_cocktail.domain.dto.ViewDTO;
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

//	@GetMapping({ "/api/cocktails" })
//	public ResponseEntity<List<CocktailDTO>> getAllCocktails() {
//		List<CocktailDTO> cocktails = this.searchService.getAllCocktails();
//		return ResponseEntity.ok(cocktails);
//	}

	@PostMapping({ "/chart" })
	public ResponseEntity<List<TimeSlotDTO>> getCocktailsByTimeRange(@RequestBody TimeRangeRequest timeRangeRequest) {
		ZonedDateTime start = timeRangeRequest.getStart();
		ZonedDateTime end = timeRangeRequest.getEnd();
		System.out.println("start: " + start);
		System.out.println("end: " + end);
		Specification<ViewLog> spec = ViewService.inTimeRange(start, end);
		List<ViewLog> views = this.viewRepository.findAll(spec);
		Map<Integer, List<ViewLog>> viewsByHour = views.stream().collect(Collectors.groupingBy((view) -> {
			return view.getViewDate().getHour();
		}));
		List<TimeSlotDTO> timeSlotDTOs = viewsByHour.entrySet().stream().map((entry) -> {
			int hour = entry.getKey();
			List<ViewLog> hourViews = entry.getValue();
			List<ViewDTO> viewDTOs = hourViews.stream().map((view) -> {
				ViewDTO dto = new ViewDTO();
				dto.setViewCd(view.getViewId());
				dto.setViewDate(view.getViewDate());
				dto.setName(view.getCocktail().getName());
				dto.setId(view.getCocktail().getId());
				return dto;
			}).collect(Collectors.toList());
			return new TimeSlotDTO(hour, hourViews.size(), viewDTOs);
		}).collect(Collectors.toList());
		System.out.println("조회된 조회수: " + views.size());
		return ResponseEntity.ok(timeSlotDTOs);
	}

	@GetMapping("/")
	public ResponseEntity<List<CocktailResponse>> getListByName(@RequestParam("name") String name) {
		log.info("getListByName 메서드 실행");
		return ResponseEntity.ok(searchService.getListByName(name));
	}
}
