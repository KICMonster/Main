package com.monster.luv_cocktail.domain.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.ExceptionCode;
import com.monster.luv_cocktail.domain.exception.BusinessLogicException;
import com.monster.luv_cocktail.domain.repository.MemberRepository;

@Component
//@NoArgsConstructor
@RequiredArgsConstructor
public class JwtService {
    @Value("${jwt.secret-key}")
    private String jwtSecret;

    private final MemberRepository memberRepository;
    
//    public JwtService() {
//    }

    public String extractEmailFromToken(String token) {
        Claims claims = (Claims)Jwts.parser().setSigningKey(this.jwtSecret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(this.jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception var3) {
            return false;
        }
    }
    
	public Member findUserByHeader(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		String accessToken = bearerToken.substring(7);
		 String email =  extractEmailFromToken(accessToken);
		 Member member = memberRepository.findByEmail(email).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NON_EXISTENT_MEMBER));
		 return member;
	}
}

