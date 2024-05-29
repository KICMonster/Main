package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "SNACK")
public class Snack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SNACK_ID", nullable = false)
    private Long id;

    @Column(name = "NAME", nullable = false, length = 255)
    private String name;

    @Column(name = "SNACK_IMG", nullable = true, length = 255)
    private String snackImg;

    @Column(name = "DESCRIPTION", nullable = true, length = 255)
    private String description;

    @Column(name = "CREATED_AT", nullable = false)
    private Date createdAt;
    
    @Column(name = "SNACK_TYPE")
    private Long type;
}