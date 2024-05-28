import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";
import "../../pages/contents/CustomCocktail.css"; // CSS 파일을 import

function CustomCocktail() {
  const [cocktails, setCocktails] = useState([]);
  const [baseFilter, setBaseFilter] = useState('');
  const [alcoholFilter, setAlcoholFilter] = useState('');
  const [uniqueIngredients, setUniqueIngredients] = useState([]);

  const fetchAllCocktails = async () => {
    try {
      const endpoint = 'https://localhost:9092/api/cocktail';
      const response = await fetch(endpoint);
      const data = await response.json();
      // 데이터를 셔플
      const shuffledData = shuffleArray(data);
      setCocktails(shuffledData);

      // 모든 고유한 리큐르 추출
      const uniqueIngredients = [...new Set(data.map(cocktail => cocktail.ingredient1))];
      setUniqueIngredients(uniqueIngredients);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  useEffect(() => {
    fetchAllCocktails();
  }, []);

  // 배열을 셔플하는 함수
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 필터링된 칵테일 목록을 계산
  const filteredCocktails = cocktails.filter(cocktail => {
    const baseMatch = baseFilter === '' || cocktail.ingredient1 === baseFilter;
    const alcoholMatch = alcoholFilter === '' || (alcoholFilter === 'Yes' && cocktail.alcoholic === 'Yes') || (alcoholFilter === 'No' && cocktail.alcoholic === 'No');
    return baseMatch && alcoholMatch;
  });

  // 베이스주 필터 설정 함수
  const handleBaseFilterChange = (event) => {
    setBaseFilter(event.target.value);
  };

  // 알콜/논알콜 필터 설정 함수
  const handleAlcoholFilterChange = (event) => {
    setAlcoholFilter(event.target.value);
  };

  // 필터 초기화 함수
  const handleResetFilter = () => {
    setBaseFilter('');
    setAlcoholFilter('');
  };

  return (
    <BasicLayout>
      <div className="filter-dropdowns">
        <select onChange={handleBaseFilterChange} value={baseFilter}>
          <option value="">리큐르</option>
          {uniqueIngredients.map((ingredient, index) => (
            <option key={index} value={ingredient}>{ingredient}</option>
          ))}
        </select>
        <select onChange={handleAlcoholFilterChange} value={alcoholFilter}>
          <option value="">알코올 여부</option>
          <option value="Yes">알코올</option>
          <option value="No">논알코올</option>
        </select>
        <button onClick={handleResetFilter}>Reset Filter</button>
        <div className="my-cocktail-link">
          <Link to="/mycocktail">My Cocktail</Link>
        </div>
      </div>
      <div className="cocktail-list">
        {filteredCocktails.map(cocktail => (
          <Link key={cocktail.id} to={`/cocktail/${cocktail.id}`} className="cocktail-link">
            <div className="cocktail-item">
              <div className="image-box">
                <img src={cocktail.imageUrl || 'default-image-url.jpg'} alt={cocktail.name} className="cocktail-image" />
              </div>
              <h2 className="cocktail-name">{cocktail.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </BasicLayout>
  );
}

export default CustomCocktail;