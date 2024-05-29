package com.monster.luv_cocktail.domain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.monster.luv_cocktail.domain.dto.SnackDetailResponse;
import com.monster.luv_cocktail.domain.dto.SnackListRequest;
import com.monster.luv_cocktail.domain.dto.SnackListResponse;
import com.monster.luv_cocktail.domain.entity.Snack;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;
import com.monster.luv_cocktail.domain.repository.SnackRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SnackService {

	private final SnackRepository snackRepository;
//	private final CocktailsRepository cocktailRepository;
	
	public List<SnackListResponse> getSnackList(Long type) {
		
		List<Snack> snackList = snackRepository.findAllByType(type);
		
		
		List<SnackListResponse> response = snackList.stream()
				.map(snack -> {
					SnackListResponse snackResponse = new SnackListResponse();
				snackResponse.setId(snack.getId());
				snackResponse.setName(snack.getName());
				snackResponse.setImage(snack.getSnackImg());
				return snackResponse;
				})
				
				.collect(Collectors.toList());
		
		
		return response;
		
	}
	
	public SnackDetailResponse getSnackDetail(Long snackId) {
		
		Snack snack = snackRepository.findById(snackId).orElseThrow(() ->new ServiceException("Snack Not Found)"));
		SnackDetailResponse response = new SnackDetailResponse();
		response.setName(snack.getName());
		response.setDescription(snack.getDescription());
		response.setImage(snack.getSnackImg());
		return response;
		
		
	}
	
}
