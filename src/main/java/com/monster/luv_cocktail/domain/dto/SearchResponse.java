package com.monster.luv_cocktail.domain.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchResponse {
    private List<Document> documents;
    private Meta meta;
}