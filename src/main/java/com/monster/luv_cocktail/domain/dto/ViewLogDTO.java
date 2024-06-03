package com.monster.luv_cocktail.domain.dto;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ViewLogDTO {
    private long viewId;
    private ZonedDateTime viewDate;
    private String cocktailName;
    private String customCocktailName;
    private String gender;
    private String birth;
}