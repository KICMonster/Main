package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "JWT_TOKEN")
public class JwtToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 ID를 생성하게 설정
    @Column(name = "TOKEN_ID", nullable = false)
    private Long tokenId;

    @Column(name = "GRANT_TYPE", nullable = false)
    private String grantType;

    @Column(name = "ACCESSTOKEN", nullable = false)
    private String accessToken;

    @Column(name = "REFRESHTOKEN", nullable = false)
    private String refreshToken;

    @Column(name = "EXPIRE_IN", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expireIn;

    @ManyToOne // Member와의 ManyToOne 관계를 나타냄
    @JoinColumn(name = "member_id") // 외래 키의 이름 지정
    private Member member;

    public JwtToken(Long tokenId, Member member, String grantType, String accessToken, String refreshToken, Date expireIn) {
        this.tokenId = tokenId;
        this.member = member;
        this.grantType = grantType;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expireIn = expireIn;
    }

    public void setExpireIn(Date expireIn) {
        this.expireIn = expireIn;
    }
}

