package com.monster.luv_cocktail.domain.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TotalCount {
    private String keyword;
    private List<String> region;
    private String selected_region;

}