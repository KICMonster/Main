package com.monster.luv_cocktail.domain.config.data;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApiDefaultSetting {
	private final ApiConfig apiConfig;

	public StringBuilder getUrlBuilder() {
		return new StringBuilder(apiConfig.getApirequestURI());
	}

	public String getResult(StringBuilder urlBuilder) {
		try {
			URL url = new URL(urlBuilder.toString());
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			conn.setRequestProperty("X-RapidAPI-Key", apiConfig.getApiKey());
			conn.setRequestProperty("X-RapidAPI-requestURI", apiConfig.getApirequestURI());
			conn.setRequestProperty("X-RapidAPI-host", apiConfig.getApihost());
			BufferedReader br;
			String result;
			if (conn.getResponseCode() == 200 && conn.getResponseCode() <= 300) {
				br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
				result = br.readLine();
				br.close();
				conn.disconnect();
			} else {
				conn.disconnect();
				result = "통신 실패\n Connection Error : " + conn.getRequestMethod();
			}
			return result;
		} catch (ProtocolException e) {
			throw new RuntimeException(e);
		} catch (MalformedURLException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}
	public JSONArray getResultJSON(String result) {
		JSONObject jsonObject = new JSONObject(result);
		return jsonObject.getJSONArray("drinks");
	}

}