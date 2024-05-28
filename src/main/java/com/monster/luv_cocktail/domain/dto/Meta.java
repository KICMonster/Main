package com.monster.luv_cocktail.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Meta {
    private boolean is_end;
    private int pageable_count;
    private TotalCount same_name;
    private int total_count;

}