import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get('https://localhost:9092/weather/recommendDefault');
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
      const response = await axios.get('https://localhost:9092/weather/api/today', { params: { lat, lon } });
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