package com.monster.luv_cocktail.domain.entity;

import com.monster.luv_cocktail.domain.enumeration.LoginType;
import com.monster.luv_cocktail.domain.enumeration.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 ID를 생성하게 설정
    @Column(name = "MEMBER_ID", nullable = false)
    private Long id;

    @Column(name = "MEMBER_NM", nullable = false, length = 20)
    private String name;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "MEMBER_PW", nullable = true, length = 50)
    private String password;

    @Column(name = "MEMBER_YMD", nullable = true, length = 8)
    private String birth;

    @Column(name = "GENDER", nullable = true, length = 1)
    private String gender;

    @Column(name = "MEMBER_PH", nullable = true, length = 11)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEMBER_ROLE", nullable = false, length = 5)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "LOGIN_TYPE", nullable = false, length = 1)
    private LoginType loginType;

    @Column(name = "TOKEN_ID", nullable = true, length = 100)
    private String tokenId;

    @Column(name = "MER_TASTE", nullable = true, length = 50)
    private String taste;

    @Column(name = "SURVEY_RES", nullable = true, length = 255)
    private String recordRes;

    @Column(name = "WITHDRAWAL_DATE" , nullable = true)
    private Date withdrawalDate;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<JwtToken> tokens;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Board> boards;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChoiceVoter> choiceVoters;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoardViewLog> boardViewLogs;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CustomCocktail> customCocktails;

    @ManyToOne
    @JoinColumn(name = "SURVEY_RES", insertable = false, updatable = false)
    private Record record;
}
