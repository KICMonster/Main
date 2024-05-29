package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.JwtTokenDTO;
import com.monster.luv_cocktail.domain.dto.UserInfo;
import com.monster.luv_cocktail.domain.entity.JwtToken;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import com.monster.luv_cocktail.domain.repository.TokenRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LoginSuccessHandler {
    private final TokenRepository tokenRepository;
    private final MemberRepository memberRepository;

    public LoginSuccessHandler(TokenRepository tokenRepository, MemberRepository memberRepository) {
        this.tokenRepository = tokenRepository;
        this.memberRepository = memberRepository;
    }

    public void handleSuccess(UserInfo userInfo, JwtTokenDTO jwtToken) {
        Optional<JwtToken> existingTokenOptional = tokenRepository.findByMemberEmail(userInfo.getEmail());
        JwtToken token = existingTokenOptional.orElse(new JwtToken());

        // Member를 UserInfo로부터 변환하거나 데이터베이스에서 조회
        Member member = memberRepository.findByEmail(userInfo.getEmail())
                .orElse(Member.fromUserInfo(userInfo));

        token.setMember(member);
        token.setGrantType(jwtToken.getGrantType());
        token.setAccessToken(jwtToken.getJwtAccessToken());
        token.setRefreshToken(jwtToken.getRefreshToken());
        token.setExpireIn(jwtToken.getExpireIn());

        tokenRepository.save(token);
    }
}

