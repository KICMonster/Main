package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.CocktailSummaryDTO;
import com.monster.luv_cocktail.domain.dto.ViewLogDTO;
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
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;

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

	

//	public List<CocktailSummaryDTO> getCocktailViewsByTimeRangeAndCategory(ZonedDateTime start, ZonedDateTime end, String category, String gender, Integer birth) {
//	    if (birth != null && (birth < 0 || birth > 99)) {
//	        throw new IllegalArgumentException("Birth year must be a two-digit integer.");
//	    }
//	    Specification<ViewLog> spec = Specification.where(inTimeRange(start, end))
//	            .and(getCategorySpecification(category))
//	            .and(getGenderSpecification(gender))
//	            .and(getBirthYearSpecification(birth));
//
//	    List<ViewLog> logs = viewRepository.findAll(spec);
//	    return logs.stream()
//	        .filter(log -> category.equals("cocktail") ? log.getCocktail() != null : log.getCustomCocktail() != null)
//	        .collect(Collectors.groupingBy(log -> category.equals("cocktail") ? log.getCocktail().getName() : log.getCustomCocktail().getName(),
//	                Collectors.summingInt(log -> 1)))
//	        .entrySet().stream()
//	        .map(entry -> new CocktailSummaryDTO(entry.getKey(), entry.getValue()))
//	        .collect(Collectors.toList());
//	}
//	
//    private Specification<ViewLog> getCategorySpecification(String category) {
//        return (root, query, builder) -> {
//            if (category.equals("cocktail")) {
//                return builder.isNotNull(root.get("cocktail"));
//            } else if (category.equals("customCocktail")) {
//                return builder.isNotNull(root.get("customCocktail"));
//            }
//            return null;
//        };
//    }
//	
//    private Specification<ViewLog> getGenderSpecification(String gender) {
//        return (root, query, builder) -> {
//            if (gender != null) {
//                return builder.equal(root.get("gender"), gender);
//            }
//            return null;	// 조건이 null 로 오면, 필터링 무시하기
//        };
//    }
//    private Specification<ViewLog> getBirthYearSpecification(Integer birth) {
//        return (root, query, builder) -> {
//            if (birth != null) {
//                String birthYear = String.format("%02d", birth);
//                return builder.equal(root.get("birth"), birthYear);
//            }
//            return null;	//마찬가지로 조건이 null로 오면 필터링 무시
//        };
//    }
//	public static Specification<ViewLog> inTimeRange(ZonedDateTime start, ZonedDateTime end) {
//		return (root, query, builder) -> {
//			Predicate predicate = builder.between(root.get("viewDate"), start, end);
//			return predicate;
//		};
//	}
//	
	
    public List<ViewLogDTO> getViewLogsByTimeRangeAndCategory(ZonedDateTime start, ZonedDateTime end, String category, String gender, Integer birth) {
        if (birth != null && (birth < 0 || birth > 99)) {
            throw new IllegalArgumentException("Birth year must be a two-digit integer.");
        }
        Specification<ViewLog> spec = Specification.where(inTimeRange(start, end))
                .and(getCategorySpecification(category))
                .and(getGenderSpecification(gender))
                .and(getBirthYearSpecification(birth));

        List<ViewLog> logs = viewRepository.findAll(spec);
        return logs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    private Specification<ViewLog> getCategorySpecification(String category) {
        return (root, query, builder) -> {
            if (category.equals("cocktail")) {
                return builder.isNotNull(root.get("cocktail"));
            } else if (category.equals("customCocktail")) {
                return builder.isNotNull(root.get("customCocktail"));
            }
            return null;
        };
    }

    private Specification<ViewLog> getGenderSpecification(String gender) {
        return (root, query, builder) -> {
            if (gender != null) {
                return builder.equal(root.get("gender"), gender);
            }
            return null;    // 조건이 null 로 오면, 필터링 무시하기
        };
    }

    private Specification<ViewLog> getBirthYearSpecification(Integer birth) {
        return (root, query, builder) -> {
            if (birth != null) {
                String birthYear = String.format("%02d", birth);
                return builder.equal(root.get("birth"), birthYear);
            }
            return null;    //마찬가지로 조건이 null로 오면 필터링 무시
        };
    }

    public static Specification<ViewLog> inTimeRange(ZonedDateTime start, ZonedDateTime end) {
        return (root, query, builder) -> builder.between(root.get("viewDate"), start, end);
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
	
    private ViewLogDTO convertToDTO(ViewLog log) {
        return new ViewLogDTO(
                log.getViewId(),
                log.getViewDate(),
                log.getCocktail() != null ? log.getCocktail().getName() : null,
                log.getCustomCocktail() != null ? log.getCustomCocktail().getName() : null,
                log.getGender(),
                log.getBirth()
        );
    }
	 
}
