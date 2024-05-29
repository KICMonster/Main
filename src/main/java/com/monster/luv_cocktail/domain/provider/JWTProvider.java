package com.monster.luv_cocktail.domain.provider;

import com.monster.luv_cocktail.domain.dto.JwtTokenDTO;
import com.monster.luv_cocktail.domain.dto.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JWTProvider {
    private static final Logger log = LoggerFactory.getLogger(JWTProvider.class);
    private final Key key;

    public JWTProvider(@Value("${jwt.secret-key}") String secretKey) {
        byte[] keyBytes = (byte[])Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }



    public JwtTokenDTO generateToken(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));
        long now = System.currentTimeMillis();
        Date accessTokenExpiresIn = new Date(now + 86400000L);
        String jwtAccessToken = Jwts.builder().setSubject(authentication.getName()).claim("auth", authorities).setExpiration(accessTokenExpiresIn).signWith(this.key, SignatureAlgorithm.HS256).compact();
        Date refreshTokenExpiresIn = new Date(now + 2592000000L);
        String refreshToken = Jwts.builder().setSubject(authentication.getName()).claim("auth", authorities).setExpiration(refreshTokenExpiresIn).signWith(this.key, SignatureAlgorithm.HS256).compact();
        return JwtTokenDTO.builder().grantType("Bearer").jwtAccessToken(jwtAccessToken).refreshToken(refreshToken).expireIn(refreshTokenExpiresIn).build();
    }


    public boolean validateRefreshToken(String refreshToken) {
        try {
            Jwts.parser().setSigningKey(this.key).parseClaimsJws(refreshToken);
            return true;
        } catch (JwtException var3) {
            JwtException e = var3;
            log.error("Invalid JWT Refresh Token", e);
            return false;
        }
    }

    public String createAccessToken(String email, String authorities) {
        long now = System.currentTimeMillis();
        Date accessTokenExpiresIn = new Date(now + 86400000L);
        return Jwts.builder().setSubject(email).claim("auth", authorities).setExpiration(accessTokenExpiresIn).signWith(this.key, SignatureAlgorithm.HS256).compact();
    }

    public Authentication getAuthentication(UserInfo userInfo) {
        List<GrantedAuthority> authorities = userInfo.getRoles().stream().map((role) -> {
            return new SimpleGrantedAuthority("ROLE_" + role);
        }).collect(Collectors.toList());
        UserDetails userDetails = new User(userInfo.getEmail(), "", authorities);
        return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
    }

    public boolean validateToken(String jwtAccessToken) {
        try {
            Jwts.parser().setSigningKey(this.key).parseClaimsJws(jwtAccessToken);
            return true;
        } catch (JwtException var3) {
            JwtException e = var3;
            log.error("Invalid JWT Token", e);
            return false;
        }
    }

    public Claims parseClaims(String jwtAccessToken) {
        try {
            return Jwts.parser().setSigningKey(this.key).parseClaimsJws(jwtAccessToken).getBody();
        } catch (JwtException var3) {
            JwtException e = var3;
            log.error("JWT parsing error", e);
            return null;
        }
    }
}

