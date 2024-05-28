//package com.monster.luv_cocktail.domain.controller;
//
//import lombok.RequiredArgsConstructor;
//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import com.monster.luv_cocktail.domain.config.data.ApiDefaultSetting;
//import com.monster.luv_cocktail.domain.entity.Cocktail;
//import com.monster.luv_cocktail.domain.service.DataService;
//
//import java.lang.reflect.InvocationTargetException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/data")
//@RequiredArgsConstructor
//public class DataController {
//
//	private final DataService dataService;
////    @Autowired
//    private final ApiDefaultSetting apiDefaultSetting;
//
//
//    @GetMapping("")
//    public String saveCocktailsList () throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
//        System.out.println("실행시작");
//        StringBuilder url = apiDefaultSetting.getUrlBuilder();
//        String response = apiDefaultSetting.getResult(url);
//        JSONArray jsonArray = apiDefaultSetting.getResultJSON(response);
//             // 칵테일 엔티티 List를 만들고
//        List<Cocktail> cocktails = new ArrayList<>();
//
//
//        // JSONArray를 반복하여 각 JSONObject를 처리
//        for (Object obj : jsonArray) {
//            JSONObject json = (JSONObject) obj;
//            Cocktail cocktail = dataService.getResult(json);
//            cocktails.add(cocktail);
//        }
//
//        dataService.saveCocktails(cocktails);
//        System.out.println("실행끝");
//        return "저장 성공!!!!!!!";
//    }
//    
//}