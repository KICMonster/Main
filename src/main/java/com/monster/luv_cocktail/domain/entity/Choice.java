//package com.monster.luv_cocktail.domain.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@Table(name = "CHOICE")
//public class Choice {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "CHOICE_ID", nullable = false)
//    private Long id;
//
//    @Column(name = "CHOICE_TEXT", nullable = false, length = 255)
//    private String choiceText;
//
//    @Column(name = "LIKE_COUNT", nullable = false)
//    private int likeCount;
//
//    @Column(name = "DISLIKE_COUNT", nullable = false)
//    private int dislikeCount;
//
//    @ManyToOne
//    @JoinColumn(name = "VOTE_ID", nullable = false)
//    private Vote vote;
//}
