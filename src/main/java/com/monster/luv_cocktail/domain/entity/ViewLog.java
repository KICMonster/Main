package com.monster.luv_cocktail.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.ZonedDateTime;

import lombok.Data;
import net.minidev.json.annotate.JsonIgnore;

@Data
@Entity
@Table(
        name = "VIEW_LOG"
)
public class ViewLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 ID를 생성하게 설정
    @Column(
            name = "VIEW_ID",
            nullable = false
    )
    private long viewId;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(
            name = "VIEW_DATE",
            nullable = false
    )
    private ZonedDateTime viewDate;
    @ManyToOne
    @JoinColumn(
            name = "cocktail_id"
    )
    @JsonIgnore
    private Cocktail cocktail;
}