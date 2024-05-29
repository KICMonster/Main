package com.monster.luv_cocktail.domain.dto;

import lombok.Data;

@Data
public class BasicLoginRequest {
    private String email;
    private String password;
}
