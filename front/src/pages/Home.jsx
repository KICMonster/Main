import React, { useEffect, useRef, useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import "../layouts/BasicLayout.css";
import Grid from '../component/main/Grid';
import '../App.css';
import Weather from '../component/main/Weather';


function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [cocktails, setCocktails] = useState([]);
 

  return (
    <BasicLayout>
      <Weather setWeather={setWeatherData} setCocktails={setCocktails} />
      <Grid weatherData={weatherData} cocktails={cocktails} />
    </BasicLayout>
  );
}

export default Home;