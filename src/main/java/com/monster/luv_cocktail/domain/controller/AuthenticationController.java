package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.BasicLoginRequest;
import com.monster.luv_cocktail.domain.dto.JwtTokenDTO;
import com.monster.luv_cocktail.domain.dto.SocialLoginRequest;
import com.monster.luv_cocktail.domain.dto.UserInfo;
import com.monster.luv_cocktail.domain.entity.JwtToken;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.ExceptionCode;
import com.monster.luv_cocktail.domain.exception.BusinessLogicException;
import com.monster.luv_cocktail.domain.provider.JWTProvider;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import com.monster.luv_cocktail.domain.repository.TokenRepository;
import com.monster.luv_cocktail.domain.service.LoginSuccessHandler;
import com.monster.luv_cocktail.domain.service.SocialLoginService;
import com.monster.luv_cocktail.domain.service.SocialLoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(
        origins = {"https://localhost:5174"}
)
@RequestMapping({"/api"})
public class AuthenticationController {
    private final JWTProvider jwtProvider;
    private final SocialLoginService socialLoginService;
    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;
    private final LoginSuccessHandler loginSuccessHandler;
    private final PasswordEncoder passwordEncoder;
    private SocialLoginSuccessHandler socialLoginSuccessHandler;

    @Autowired
    public AuthenticationController(JWTProvider jwtProvider, SocialLoginService socialLoginService, SocialLoginSuccessHandler socialLoginSuccessHandler, MemberRepository memberRepository, TokenRepository tokenRepository, LoginSuccessHandler loginSuccessHandler, PasswordEncoder passwordEncoder) {
        this.jwtProvider = jwtProvider;
        this.socialLoginService = socialLoginService;
        this.socialLoginSuccessHandler = socialLoginSuccessHandler;
        this.memberRepository = memberRepository;
        this.tokenRepository = tokenRepository;
        this.loginSuccessHandler = loginSuccessHandler;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping({"/authenticate"})
    public ResponseEntity<JwtTokenDTO> handleSocialLogin(@RequestBody SocialLoginRequest request) {
        String accessToken = request.getAccessToken();
        String service = request.getService();
        System.out.println(service);
        System.out.println(accessToken);
        UserInfo userInfo = null;
        if ("kakao".equalsIgnoreCase(service)) {
            userInfo = this.socialLoginService.getUserInfoFromKakao(accessToken);
        } else if ("naver".equalsIgnoreCase(service)) {
            userInfo = this.socialLoginService.getUserInfoFromNaver(accessToken);
        } else {
            userInfo = this.socialLoginService.getUserInfoFromGoogle(accessToken);
        }

        Authentication authentication = this.jwtProvider.getAuthentication(userInfo);
        System.out.println("토큰로직 권한확인");
        JwtTokenDTO jwtToken = this.jwtProvider.generateToken(authentication);
        System.out.println(jwtToken);
        this.socialLoginSuccessHandler.handleSuccess(userInfo, jwtToken);
        return ResponseEntity.ok(jwtToken);
    }


    @PostMapping("/login")
    public ResponseEntity<JwtTokenDTO> login(@RequestBody BasicLoginRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();
        try {
            // 회원 존재 여부 확인
            Member member = memberRepository.findByEmail(email)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NON_EXISTENT_MEMBER));

            // 저장된 암호화된 비밀번호
            String storedPassword = member.getPassword();

            // 입력한 비밀번호와 저장된 암호화된 비밀번호 비교
            if (!passwordEncoder.matches(password, storedPassword)) {
                // 비밀번호가 일치하지 않는 경우
                throw new BusinessLogicException(ExceptionCode.INVALID_CREDENTIALS);
            }

            // Member를 UserInfo로 변환
            UserInfo userInfo = UserInfo.fromMember(member);

            // 회원의 이메일을 기반으로 토큰 조회
            Optional<JwtToken> optionalToken = tokenRepository.findByMemberEmail(email);

            JwtTokenDTO jwtToken;
            if (optionalToken.isPresent()) { // 토큰이 있는 경우
                JwtToken token = optionalToken.get();
                jwtToken = new JwtTokenDTO(token.getGrantType(), token.getAccessToken(), token.getRefreshToken(), token.getExpireIn());
            } else { // 토큰이 없는 경우
                // JWT 토큰 생성
                Authentication authentication = this.jwtProvider.getAuthentication(userInfo);
                jwtToken = jwtProvider.generateToken(authentication);
            }

            // 로그인 성공 처리
            loginSuccessHandler.handleSuccess(userInfo, jwtToken);

            return ResponseEntity.ok(jwtToken);

        } catch (BusinessLogicException e) {
            if (e.getExceptionCode() == ExceptionCode.NON_EXISTENT_MEMBER) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else if (e.getExceptionCode() == ExceptionCode.INVALID_CREDENTIALS) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}