package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.CocktailDTO;
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

@CrossOrigin(
        origins = {"https://localhost:5174"}
)
@RequestMapping({"/search"})
@Controller
public class SearchController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private SearchService searchService;
    @Autowired
    private CocktailsRepository cocktailsRepository;
    @Autowired
    private ViewRepository viewRepository;

    public SearchController() {
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping({"/updateTasteAndRecommend"})
    public ResponseEntity<List<Cocktail>> updateTasteAndRecommend(@RequestHeader("Authorization") String jwtToken, @RequestBody TasteStringDTO tasteString) {
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
            Member member = (Member)this.memberRepository.findByEmail(email).orElseThrow(() -> {
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

    @GetMapping({"/api/cocktails"})
    public ResponseEntity<List<CocktailDTO>> getAllCocktails() {
        List<CocktailDTO> cocktails = this.searchService.getAllCocktails();
        return ResponseEntity.ok(cocktails);
    }

    @PostMapping({"/api/chart"})
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
            return new TimeSlotDTO(hour,hourViews.size(), viewDTOs);
        }).collect(Collectors.toList());
        System.out.println("조회된 조회수: " + views.size());
        return ResponseEntity.ok(timeSlotDTOs);
    }
}
