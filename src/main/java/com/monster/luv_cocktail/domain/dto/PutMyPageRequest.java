package com.monster.luv_cocktail.domain.dto;

import org.springframework.web.multipart.MultipartFile;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PutMyPageRequest {

	private MultipartFile profileImage;
	private String introduction;
}
