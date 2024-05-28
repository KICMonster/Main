package com.monster.luv_cocktail.domain.service;


import lombok.RequiredArgsConstructor;


//import okhttp3.OkHttpClient;
//import okhttp3.Request;
//import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.monster.luv_cocktail.domain.config.data.ApiConfig;
import com.monster.luv_cocktail.domain.config.data.ApiDefaultSetting;
import com.monster.luv_cocktail.domain.entity.Cocktail;
import com.monster.luv_cocktail.domain.repository.CocktailsRepository;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DataService {

	private final CocktailsRepository cocktailRepository;
	private final ApiConfig apiConfig;
	private final TranslationService translationService;

	@Value("${rapid.api.key}")
	private String apiKey;
	@Value("${rapid.api.requestURI}")
	private String apirequestURI;
	@Value("${rapid.api.host}")
	private String apihost;

	@Transactional
	public void saveCocktails(List<Cocktail> cocktails) {
		cocktailRepository.saveAll(cocktails);
	}

	@Transactional
	public String searchCocktails() {
		StringBuilder urlBuilder = new ApiDefaultSetting(apiConfig).getUrlBuilder();
		return new ApiDefaultSetting(apiConfig).getResult(urlBuilder);
	}

	@Transactional
	public Cocktail getResult(JSONObject obj)
			throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

		LocalDateTime dateModified = null;
		String dateModifiedString = obj.optString("dateModified");
		if (dateModifiedString != null && !dateModifiedString.isEmpty()) {
			try {
				dateModified = LocalDateTime.parse(dateModifiedString,
						DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			} catch (DateTimeParseException e) {
				System.err.println("Failed to parse dateModified: " + dateModifiedString);
				// Handle the error accordingly (e.g., set to null or a default value)
			}
		}

		// 그럼 여기서 번역해야겠지
		String instructions = obj.optString("strInstructions");
		String instructionShort = instructions.length() > 200 ? instructions.substring(0, 200) : instructions;
		
		String nameInKorean = translationService.translateToKorean(obj.getString("strDrink"));
		String instructionsInKorean = translationService.translateToKorean(instructionShort);
		String glassInKorean = translationService.translateToKorean(obj.optString("strGlass"));
		String categoryInKorean = translationService.translateToKorean(obj.optString("strCategory"));

		// 값 받아온걸 DB에 집어넣어보자
		// 0522 현민이가 제작한 DB 모양대로
		Cocktail cocktail = new Cocktail();
//		cocktail.setId(obj.getLong("idDrink"));
		cocktail.setName(nameInKorean);
		cocktail.setCategory(categoryInKorean);
		cocktail.setAlcoholic(obj.optString("strAlcoholic"));
		cocktail.setGlass(glassInKorean);
		cocktail.setCcl(obj.optString("strCreativeCommonsConfirmed"));
		cocktail.setWeather(null);
		cocktail.setImageUrl(obj.optString("strDrinkThumb"));
		cocktail.setTaste(null);
		cocktail.setInstructions(instructionsInKorean);

		for (int i = 1; i <= 15; i++) {
			String ingredientKey = "strIngredient" + i;
			String ingredient = obj.optString(ingredientKey);
			String ingredientInKorean = translationService.translateToKorean(ingredient);
//			Method ingredientSetter = Cocktail.class.getDeclaredMethod("setIngredient" + i, String.class);
//			ingredientSetter.invoke(cocktail, ingredient);
			Method ingredientSetter = Cocktail.class.getDeclaredMethod("setIngredient" + i, String.class);
			ingredientSetter.invoke(cocktail, ingredientInKorean);
		}

		for (int i = 1; i <= 15; i++) {
			String measureKey = "strMeasure" + i;
			String measure = obj.optString(measureKey);
			Method measureSetter = Cocktail.class.getDeclaredMethod("setMeasure" + i, String.class);
			measureSetter.invoke(cocktail, measure);
		}

		return cocktail;
	}

	@Transactional
	public List<Cocktail> getAllCocktails() {
		return cocktailRepository.findAll();
	}

	@Transactional
	private Cocktail translateCocktail(Cocktail cocktail) {
		cocktail.setName(translationService.translateToKorean(cocktail.getName()));
		cocktail.setCategory(translationService.translateToKorean(cocktail.getCategory()));
		cocktail.setAlcoholic(translationService.translateToKorean(cocktail.getAlcoholic()));
		cocktail.setGlass(translationService.translateToKorean(cocktail.getGlass()));
//        cocktail.setCcl(translationService.translateToKorean(cocktail.getCcl()));
//        cocktail.setWeather(translationService.translateToKorean(cocktail.getWeather()));
//        cocktail.setImageUrl(translationService.translateToKorean(cocktail.getImageUrl()));
//        cocktail.setTaste(translationService.translateToKorean(cocktail.getTaste()));
		cocktail.setInstructions(translationService.translateToKorean(cocktail.getInstructions()));

		cocktail.setIngredient1(translationService.translateToKorean(cocktail.getIngredient1()));
		cocktail.setIngredient2(translationService.translateToKorean(cocktail.getIngredient2()));
		cocktail.setIngredient3(translationService.translateToKorean(cocktail.getIngredient3()));
		cocktail.setIngredient4(translationService.translateToKorean(cocktail.getIngredient4()));
		cocktail.setIngredient5(translationService.translateToKorean(cocktail.getIngredient5()));
		cocktail.setIngredient6(translationService.translateToKorean(cocktail.getIngredient6()));
		cocktail.setIngredient7(translationService.translateToKorean(cocktail.getIngredient7()));
		cocktail.setIngredient8(translationService.translateToKorean(cocktail.getIngredient8()));
		cocktail.setIngredient9(translationService.translateToKorean(cocktail.getIngredient9()));
		cocktail.setIngredient10(translationService.translateToKorean(cocktail.getIngredient10()));
		cocktail.setIngredient11(translationService.translateToKorean(cocktail.getIngredient11()));
		cocktail.setIngredient12(translationService.translateToKorean(cocktail.getIngredient12()));
		cocktail.setIngredient13(translationService.translateToKorean(cocktail.getIngredient13()));
		cocktail.setIngredient14(translationService.translateToKorean(cocktail.getIngredient14()));
		cocktail.setIngredient15(translationService.translateToKorean(cocktail.getIngredient15()));

		// 다른 필드에 대한 번역도 여기에 추가
		return cocktail;
	}

	@Transactional
	public void translateAndSaveCocktails() {
		List<Cocktail> cocktails = getAllCocktails();
		for (Cocktail cocktail : cocktails) {
			translateCocktail(cocktail);
			cocktailRepository.save(cocktail);
		}
	}

//    public List<Cocktail> getListFromAPI() throws IOException {
//        OkHttpClient client = new OkHttpClient();
//
//        Request request = new Request.Builder()
//                .url(apirequestURI)
//                .get()
//                .addHeader("X-RapidAPI-Key", apiKey)
//                .addHeader("X-RapidAPI-Host", apihost)
//                .build();
//
//        try (Response response = client.newCall(request).execute()) {
//            if (response.isSuccessful() && response.body() != null) {
//                System.out.println(response.body().string());
//            } else {
//                System.out.println("Request not successful: " + response);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//
//        return List.of();
//    }
}
