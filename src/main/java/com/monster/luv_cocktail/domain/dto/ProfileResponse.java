package com.monster.luv_cocktail.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileResponse {

	private String imageUrl;
	private String name;
	private String gender;
	private String birth;
	private String email;
	private String phone;
}
