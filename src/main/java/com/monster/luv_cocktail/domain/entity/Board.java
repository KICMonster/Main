//package com.monster.luv_cocktail.domain.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.Date;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@Table(name = "BOARD")
//public class Board {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "BOARD_ID", nullable = false)
//    private Long id;
//
//    @Column(name = "TITLE", nullable = false, length = 255)
//    private String title;
//
//    @Column(name = "CONTENT", nullable = false, length = 255)
//    private String content;
//
//    @Column(name = "CREATED_AT", nullable = false)
//    private Date createdAt;
//
//    @Column(name = "UPDATED_AT", nullable = false)
//    private Date updatedAt;
//
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID", nullable = false)
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "CUSTOM_ID", nullable = false)
//    private CustomCocktail customCocktail;
//}
