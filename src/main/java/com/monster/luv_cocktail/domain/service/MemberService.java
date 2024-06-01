package com.monster.luv_cocktail.domain.service;

import com.monster.luv_cocktail.domain.dto.JoinRequestDTO;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.EmailVerificationResult;
import com.monster.luv_cocktail.domain.enumeration.ExceptionCode;
import com.monster.luv_cocktail.domain.enumeration.LoginType;
import com.monster.luv_cocktail.domain.enumeration.Role;
import com.monster.luv_cocktail.domain.exception.BusinessLogicException;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;
import com.monster.luv_cocktail.domain.repository.MemberRepository;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MemberService {
    private static final Logger log = LoggerFactory.getLogger(MemberService.class);
    private static final String AUTH_CODE_PREFIX = "AuthCode ";
    private final MemberRepository memberRepository;
    private final SendEmailService mailService;
    private final JwtService jwtService;
    private final InMemoryAuthCodeStore inMemoryAuthCodeStore;
    private final PasswordEncoder passwordEncoder;
    private final CocktailsRepository cocktailsRepository;

    @Value("${spring.mail.properties.auth-code-expiration-millis}")
    private long authCodeExpirationMillis;

    public void sendCodeToEmail(String toEmail) {
        this.checkDuplicatedEmail(toEmail);
        String title = "cocktail 이메일 인증 번호";
        String authCode = this.createCode();
        this.mailService.sendEmail(toEmail, title, authCode);
        this.inMemoryAuthCodeStore.saveCode("AuthCode " + toEmail, authCode);
    }

    private void checkDuplicatedEmail(String email) {
        Optional<Member> member = this.memberRepository.findByEmail(email);
        if (member.isPresent()) {
            log.debug("MemberServiceImpl.checkDuplicatedEmail exception occur email: {}", email);
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    private String createCode() {
        int length = 6;

        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();

            for(int i = 0; i < length; ++i) {
                builder.append(random.nextInt(10));
            }

            return builder.toString();
        } catch (NoSuchAlgorithmException var5) {
            log.debug("MemberService.createCode() exception occur");
            throw new BusinessLogicException(ExceptionCode.NO_SUCH_ALGORITHM);
        }
    }

    public EmailVerificationResult verifyCode(String email, String authCode) {
        String key = "AuthCode " + email;
        String storedAuthCode = this.inMemoryAuthCodeStore.getCode(key);
        if (storedAuthCode == null) {
            return EmailVerificationResult.CODE_NOT_FOUND;
        } else {
            boolean authResult = storedAuthCode.equals(authCode);
            return EmailVerificationResult.of(authResult);
        }
    }

    @Transactional
    public void processJoinRequest(JoinRequestDTO requestDto) {
        Member member = new Member();
        member.setEmail(requestDto.getEmail());
        member.setPassword(this.passwordEncoder.encode(requestDto.getPassword()));
        System.out.println("암호화된 비밀번호: " + member.getPassword());
        member.setName(requestDto.getName());
        member.setBirth(requestDto.getBirth());
        member.setPhone(requestDto.getPhone());
        member.setGender(requestDto.getGender());
        if (requestDto.getPassword() != null && !requestDto.getPassword().isEmpty()) {
            member.setRole(Role.USER);
            member.setLoginType(LoginType.N);
        }

        this.memberRepository.save(member);
    }

    @Transactional
    public void processWithdrawal(String jwtToken) {
        if (!this.jwtService.validateToken(jwtToken)) {
            throw new IllegalArgumentException("Invalid JWT token");
        } else {
            String email = this.jwtService.extractEmailFromToken(jwtToken);
            Optional<Member> optionalMember = this.memberRepository.findByEmail(email);
            if (optionalMember.isEmpty()) {
                throw new IllegalArgumentException("Member not found for email: " + email);
            } else {
                Member member = (Member)optionalMember.get();
                this.memberRepository.delete(member);
            }
        }
    }

    public Member findMemberByJwtToken(String jwtToken) {
        String email = this.jwtService.extractEmailFromToken(jwtToken);
        return (Member)this.memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("Member not found for email: " + email);
        });
    }

    @Transactional
    public void updateMemberTaste(String jwtToken, String taste) {
        String email = this.jwtService.extractEmailFromToken(jwtToken);
        Member member = (Member)this.memberRepository.findByEmail(email).orElseThrow(() -> {
            return new IllegalArgumentException("Member not found for email: " + email);
        });
        member.setTaste(taste);
        this.memberRepository.save(member);
    }

    public List<Cocktail> findCocktailsByTaste(List<String> tasteIds) {
        return cocktailsRepository.findByTasteIn(tasteIds);
    }

    public MemberService(final MemberRepository memberRepository, final SendEmailService mailService, final JwtService jwtService, final InMemoryAuthCodeStore inMemoryAuthCodeStore, final PasswordEncoder passwordEncoder, final CocktailsRepository cocktailsRepository) {
        this.memberRepository = memberRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.inMemoryAuthCodeStore = inMemoryAuthCodeStore;
        this.passwordEncoder = passwordEncoder;
        this.cocktailsRepository = cocktailsRepository;
    }
}