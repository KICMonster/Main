package com.monster.luv_cocktail.domain.controller;

import com.monster.luv_cocktail.domain.dto.EmailResponseDTO;
import com.monster.luv_cocktail.domain.dto.JoinRequestDTO;
import com.monster.luv_cocktail.domain.dto.JwtTokenDTO;
import com.monster.luv_cocktail.domain.dto.SingleResponseDTO;
import com.monster.luv_cocktail.domain.entity.Member;
import com.monster.luv_cocktail.domain.enumeration.EmailVerificationResult;
import com.monster.luv_cocktail.domain.enumeration.ExceptionCode;
import com.monster.luv_cocktail.domain.exception.BusinessLogicException;
import com.monster.luv_cocktail.domain.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(
//        origins = {"https://localhost:5174"}
//)
@RequestMapping({"/api/join"})
@RestController
public class JoinController {
    private final MemberService memberService;
    
    public JoinController(MemberService memberService) {
        this.memberService = memberService;
    }
    @PostMapping({"/emails/verification-requests"})
    public ResponseEntity<Void> sendMessage(@RequestBody @Valid EmailResponseDTO request) {
        String email = request.getEmail();
        System.out.println(email);

        try {
            this.memberService.sendCodeToEmail(email);
        } catch (BusinessLogicException var4) {
            BusinessLogicException e = var4;
            if (e.getExceptionCode() == ExceptionCode.MEMBER_EXISTS) {
                return new ResponseEntity(HttpStatus.CONFLICT);
            }

            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping({"/emails/verifications"})
    public ResponseEntity<SingleResponseDTO<EmailVerificationResult>> verificationEmail(@RequestParam("email") @Valid String email, @RequestParam("code") String authCode) {
        EmailVerificationResult response = this.memberService.verifyCode(email, authCode);
        new SingleResponseDTO(response);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping({"/submit"})
    public ResponseEntity<String> submitJoinRequest(@RequestBody JoinRequestDTO requestDto) {
        try {
            this.memberService.processJoinRequest(requestDto);
            return ResponseEntity.ok("Join request processed successfully");
        } catch (Exception var3) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process join request");
        }
    }

    @DeleteMapping({"/withdraw"})
    public ResponseEntity<String> withdrawMember(@RequestBody JwtTokenDTO jwtToken) {
        try {
            Member member = this.memberService.findMemberByJwtToken(jwtToken.getJwtAccessToken());
            System.out.println(member.getEmail());
            this.memberService.processWithdrawal(member.getEmail());
            return ResponseEntity.ok("Member withdrawal processed successfully");
        } catch (IllegalArgumentException var3) {
            IllegalArgumentException e = var3;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception var4) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process member withdrawal");
        }
    }
}
