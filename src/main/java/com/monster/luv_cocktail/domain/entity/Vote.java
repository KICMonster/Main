//package com.monster.luv_cocktail.domain.entity;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import java.util.List;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@Table(name = "VOTE")
//public class Vote {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "VOTE_ID", nullable = false)
//    private Long id;
//
//    @Column(name = "TITLE", nullable = false, length = 255)
//    private String title;
//
//    @Column(name = "DESCRIPTION", nullable = true, length = 255)
//    private String description;
//
//    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Choice> choices;
//}
