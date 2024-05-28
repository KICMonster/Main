package com.monster.luv_cocktail.domain.dto;

import java.util.List;


public class TranslationData {
	private List<TranslationText> translations;

	public List<TranslationText> getTranslations() {
		return translations;
	}

	public void setTranslations(List<TranslationText> translations) {
		this.translations = translations;
	}
}