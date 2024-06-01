package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.entity.CustomCocktail;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.entity.ViewLog;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;
import com.monster.luv_cocktail.domain.repository.CustomCocktailRepository;
import com.monster.luv_cocktail.domain.repository.ViewRepository;
import jakarta.persistence.criteria.Predicate;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import java.time.ZonedDateTime;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ViewService {
	private final CocktailsRepository cocktailRepository;

	private final CustomCocktailRepository customCocktailRepository;
	
	private final ExecutorService executorService = Executors.newFixedThreadPool(10);

	private final ViewRepository viewRepository;
	
	private final JwtService jwtService;

	public static Specification<ViewLog> inTimeRange(ZonedDateTime start, ZonedDateTime end) {
		return (root, query, builder) -> {
			Predicate predicate = builder.between(root.get("viewDate"), start, end);
			return predicate;
		};
	}

	public void addViewLog(Long id, Map<String, String> request, HttpServletRequest servletRequest) {
		String timestamp = request.get("timestamp");
		String authorizationHeader = servletRequest.getHeader("Authorization");
		
		Cocktail cocktail = cocktailRepository.findById(id).orElseThrow(() -> {
			return new RuntimeException("Cocktail not found");
		});
		this.executorService.submit(() -> {
			ViewLog view = new ViewLog();
			view.setCocktail(cocktail);
			view.setViewDate(ZonedDateTime.parse(timestamp));
			
	        if (authorizationHeader != null && !authorizationHeader.isEmpty()) {
	            // Authorization 헤더가 존재하면, 해당 토큰을 사용하여 사용자를 찾습니다.
	            Member member = jwtService.findUserByHeader(servletRequest);
	            if (member != null) {
	                view.setGender(member.getGender()); 
	                if (member.getBirth() != null) {
	                    String birth = member.getBirth().substring(2, 4); // "1998-10-13"에서 "98" 추출 , 
	                    view.setBirth(birth);
	                }
	            }
	        }
	        
	        viewRepository.save(view);
	    });
	}
	
	public void addCustomViewLog(Long id, Map<String, String> request, HttpServletRequest servletRequest) {
		String timestamp = request.get("timestamp");
		String authorizationHeader = servletRequest.getHeader("Authorization");
		
		CustomCocktail cocktail = customCocktailRepository.findById(id).orElseThrow(() -> {
			return new RuntimeException("Cocktail not found");
		});
		this.executorService.submit(() -> {
			ViewLog view = new ViewLog();
			view.setCustomCocktail(cocktail);
			view.setViewDate(ZonedDateTime.parse(timestamp));
			
			if (authorizationHeader != null && !authorizationHeader.isEmpty()) {
				// Authorization 헤더가 존재하면, 해당 토큰을 사용하여 사용자를 찾습니다.
				Member member = jwtService.findUserByHeader(servletRequest);
				if (member != null) {
					view.setGender(member.getGender()); 
					if (member.getBirth() != null) {
						String birth = member.getBirth().substring(2, 4); // "1998-10-13"에서 "98" 추출 , 
						view.setBirth(birth);
					}
				}
			}
			
			viewRepository.save(view);
		});
	}

}
