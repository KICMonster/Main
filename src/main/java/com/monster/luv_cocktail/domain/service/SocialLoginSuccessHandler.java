package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.JwtTokenDTO;
import com.monster.luv_cocktail.domain.dto.UserInfo;
import com.monster.luv_cocktail.domain.entity.JwtToken;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.LoginType;
import com.monster.luv_cocktail.domain.enumeration.Role;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import com.monster.luv_cocktail.domain.repository.TokenRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SocialLoginSuccessHandler {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TokenRepository tokenRepository;

    public SocialLoginSuccessHandler() {
    }

    public void handleSuccess(UserInfo userInfo, JwtTokenDTO jwtToken) {
        String userEmail = userInfo.getEmail();
        Optional<Member> existingMemberOptional = this.memberRepository.findByEmail(userEmail);
        Member existingMember;
        if (existingMemberOptional.isPresent()) {
            existingMember = existingMemberOptional.get();
            existingMember.setName(userInfo.getName());
            existingMember.setRole(userInfo.getRoles().get(0));
            existingMember.setLoginType(userInfo.getLoginTypes().get(0));
        } else {
            // 새로운 회원 생성
            existingMember = new Member();
            existingMember.setEmail(userEmail);
            existingMember.setName(userInfo.getName());
            existingMember.setRole(userInfo.getRoles().get(0));
            existingMember.setLoginType(userInfo.getLoginTypes().get(0));
        }

        // 회원 저장
        existingMember = this.memberRepository.save(existingMember);

        // 회원의 이메일을 기반으로 기존 토큰 조회
        Optional<JwtToken> existingTokenOptional = this.tokenRepository.findByMemberEmail(userEmail);
        if (existingTokenOptional.isPresent()) {
            // 이미 토큰이 존재하면 해당 토큰 업데이트
            JwtToken existingToken = existingTokenOptional.get();
            existingToken.setAccessToken(jwtToken.getJwtAccessToken());
            existingToken.setRefreshToken(jwtToken.getRefreshToken());
            existingToken.setExpireIn(jwtToken.getExpireIn());
            existingToken.setGrantType(jwtToken.getGrantType());
            existingToken.setMember(existingMember);
            this.tokenRepository.save(existingToken);
        } else {
            // 토큰이 존재하지 않으면 새로 생성
            JwtToken newToken = new JwtToken();
            newToken.setAccessToken(jwtToken.getJwtAccessToken());
            newToken.setRefreshToken(jwtToken.getRefreshToken());
            newToken.setExpireIn(jwtToken.getExpireIn());
            newToken.setGrantType(jwtToken.getGrantType());
            newToken.setMember(existingMember);
            this.tokenRepository.save(newToken);
        }

        System.out.println("사용자 정보와 JWT 토큰이 데이터베이스에 저장되었습니다.");
    }
}
