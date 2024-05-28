package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "BOARDVIEW_LOG")
public class BoardViewLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "VIEW_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "COCKTAIL_ID")
    private Cocktail cocktail;

    @Column(name = "VIEW_DATE", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private ZonedDateTime viewDate;

}
