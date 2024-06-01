import React, { useState, useEffect } from 'react';
import axios from 'axios';
// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const Weather = ({ setWeather, setCocktails }) => {
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 페이지가 처음 로드될 때 서울 기준의 날씨 정보를 가져옴
    fetchSeoulWeather();
    // 페이지가 렌더링된 후에 위치 정보를 가져옴
    handleGetCurrentLocation();
  }, []);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setError('Error getting current location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchSeoulWeather = async () => {
    setLoadingWeather(true);
    try {
      const response = await axiosInstance.get('/weather/default');
      const defaultCocktails = response.data;
      setCocktails(defaultCocktails);
      console.log(defaultCocktails);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data.');
    }
    setLoadingWeather(false);
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axiosInstance.get('/weather/today', { params: { lat, lon } });
      setWeather(response.data.weatherInfo);
      setCocktails(response.data.recommendedCocktails);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data.');
    }
  };

  return null;
};

export default Weather;