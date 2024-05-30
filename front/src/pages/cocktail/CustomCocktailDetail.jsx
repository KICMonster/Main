import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function CustomCocktailDetail() {
  const { customNm } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(0);
  const [hasRecommended, setHasRecommended] = useState(false); // 사용자가 이미 추천을 눌렀는지 여부

  const fetchCocktailDetail = async () => {
    try {
      const cocktailEndpoint = `https://localhost:9092/customCocktails/search/?name=${customNm}`;
      const cocktailResponse = await fetch(cocktailEndpoint);
      const cocktailData = await cocktailResponse.json();
      setCocktail(cocktailData);
    } catch (error) {
      console.error('Error fetching cocktail detail:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCocktailDetail();
  }, [customNm]);

  // 추천 기능
  const handleRecommendation = () => {
    if (!hasRecommended) {
      setRecommendation(recommendation + 1);
      setHasRecommended(true);
      // 여기에 추천 기능을 위한 API 호출 또는 데이터베이스 업데이트 로직을 추가하세요.
    }
  };

  if (error) {
    return (
      <BasicLayout>
        <div>Error: {error}</div>
      </BasicLayout>
    );
  }

  if (!cocktail) {
    return (
      <BasicLayout>
        <div>Loading...</div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div className="container" style={{ paddingRight:'42px', marginTop:'150px' }}>
        <div className="leftColumn" style={{ gridColumn: '1 / 4' }}>
          <div className="imageBox">
            <img src={cocktail.imageUrl} alt={cocktail.name} className="cocktailImage2" />
          </div>
        </div>
        <div className="rightColumn" style={{ gridColumn: '4 / span 3' }}>
          <div className="contentBox">
            <h1 className="cocktailName">{cocktail.name}</h1>
            <hr className="divider" />
            <p className="cocktailDescription">{cocktail.description}</p>
            <h2 className="sectionTitle">Ingredients:</h2>
            <ul className="ingredientsList">
              <li>Vodka: {cocktail.measure1}</li>
              <li>Triple sec: {cocktail.measure2}</li>
              <li>Cranberry juice: {cocktail.measure3}</li>
            </ul>
            <h2 className="sectionTitle">Instructions:</h2>
            <p className="instructions">{cocktail.instructions}</p>
            <h2 className="sectionTitle">추천:</h2>
            <div>
              <button onClick={handleRecommendation} disabled={hasRecommended}>Recommend</button>
              <span>{recommendation}</span>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default CustomCocktailDetail;
