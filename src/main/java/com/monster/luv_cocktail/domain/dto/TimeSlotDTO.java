package com.monster.luv_cocktail.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class TimeSlotDTO {
    private int hour;
//    private Long searchCount;
    private int viewCount;
    private List<String> cocktailNames;
}


/*
 * package com.monster.luv_cocktail.domain.dto;
 * 
 * import lombok.Data;
 * 
 * import java.util.List;
 * 
 * @Data public class TimeSlotDTO { private int hour; private long searchCount;
 * private List<ViewDTO> views;
 * 
 * public TimeSlotDTO(int hour, long searchCount, List<ViewDTO> views) {
 * this.hour = hour; this.searchCount = searchCount; this.views = views; }
 * 
 * // getters and setters }
 */