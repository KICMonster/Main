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
//@Table(name = "CHOICEVOTER")
//public class ChoiceVoter {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "CHOICEVOTER_ID", nullable = false)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID", nullable = false)
//    private Member member;
//
//    @ManyToOne
//    @JoinColumn(name = "CHOICE_ID", nullable = false)
//    private Choice choice;
//}