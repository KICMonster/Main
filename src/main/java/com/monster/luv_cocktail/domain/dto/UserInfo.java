package com.monster.luv_cocktail.domain.dto;

import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.LoginType;
import com.monster.luv_cocktail.domain.enumeration.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
public class UserInfo {
    private String email;
    private String name;
    private Long id;
    private List<Role> roles; // 사용자 권한 정보를 저장하는 필드 추가
    private List<LoginType> loginTypes; // 사용자 로그인 타입 정보를 저장하는 필드 추가

    // 기본 생성자, Getter 및 Setter 생략

    public static UserInfo fromMember(Member member) {
        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(member.getEmail());
        userInfo.setName(member.getName());
        userInfo.setId(member.getId());
        userInfo.setRoles(Collections.singletonList(member.getRole()));
        userInfo.setLoginTypes(Collections.singletonList(member.getLoginType()));
        return userInfo;
    }


    public static UserInfo mapKakaoUserInfoToUserInfo(KakaoUserInfo kakaoUserInfo) {
        UserInfo userInfo = new UserInfo();
        if (kakaoUserInfo.getKakao_account() != null) {
            userInfo.setEmail(kakaoUserInfo.getKakao_account().getEmail());
            // 프로필 닉네임 정보 설정
            if (kakaoUserInfo.getKakao_account().getProfile() != null) {
                userInfo.setName(kakaoUserInfo.getKakao_account().getProfile().getNickname());
            }
        }
        userInfo.setId(kakaoUserInfo.getId());
        // 다른 필드 설정
        return userInfo;
    }


    // UserInfo 클래스 내부
    public static UserInfo mapNaverUserInfoToUserInfo(NaverUserInfo naverUserInfo) {
        UserInfo userInfo = new UserInfo();
        userInfo.setName(naverUserInfo.getResponse().getName());       // 네이버 유저 이름을 사용
        userInfo.setEmail(naverUserInfo.getResponse().getEmail());     // 네이버 유저 이메일을 사용
        return userInfo;
    }

    // UserInfo 클래스 내부
    public static UserInfo mapGoogleUserInfoToUserInfo(GoogleUserInfo googleUserInfo) {
        UserInfo userInfo = new UserInfo();
        userInfo.setName(googleUserInfo.getName());      // 구글 유저 이름을 사용
        userInfo.setEmail(googleUserInfo.getEmail());    // 구글 유저 이메일을 사용
        return userInfo;
    }

}
