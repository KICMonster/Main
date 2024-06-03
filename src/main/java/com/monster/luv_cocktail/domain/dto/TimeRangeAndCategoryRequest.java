package com.monster.luv_cocktail.domain.dto;

import java.time.ZonedDateTime;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TimeRangeAndCategoryRequest {
    private ZonedDateTime start;
    private ZonedDateTime end;
    private String category;
    private String gender; // 이 필드는 옵셔널일 수 있으므로 null 처리를 고려해야 함
    private Integer birth; // 이 필드는 옵셔널일 수 있으므로 null 처리를 고려해야 함
}