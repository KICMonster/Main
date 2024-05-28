import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconRenderer from '../renderIcon'; // 아이콘 렌더링 컴포넌트 import

const Weather = ({setWeather, setCocktails}) => {
  // const [weather, setWeather] = useState(null);
  // const [cocktails, setCocktails] = useState([]);
  // const [randomCocktail, setRandomCocktail] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  // const [loadingRandomCocktail, setLoadingRandomCocktail] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 페이지가 처음 로드될 때 현재 위치의 날씨 정보를 가져옴
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
  
  const fetchWeather = async (lat, lon) => {
    setLoadingWeather(true);
    try {
      const response = await axios.get('https://localhost:9092/weather/api/today', {params: { lat, lon },}); // comma 지워도될것같음 왜있는지모름
      setWeather(response.data.weatherInfo);
      setCocktails(response.data.recommendedCocktails);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data.');
    }
    setLoadingWeather(false);
  };

  return null;
};

export default Weather;