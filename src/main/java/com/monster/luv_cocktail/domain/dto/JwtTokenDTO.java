package com.monster.luv_cocktail.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.Optional;

@Builder
@Data
@AllArgsConstructor
public class JwtTokenDTO {
    private String grantType;
    private String jwtAccessToken;
    private String refreshToken;
    private Date expireIn;


}
