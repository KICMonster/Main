import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/CocktailDetail.css';

function CocktailDetail() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(null);
  const [appetizers, setAppetizers] = useState([]);

  const fetchCocktailDetail = async () => {
    try {
      const cocktailEndpoint = `https://localhost:9092/api/cocktail/${cocktailId}`;
      const type = cocktailId % 7 + 1; // 칵테일 ID를 7로 나눈 나머지를 얻습니다.
      const appetizersEndpoint = `https://localhost:9092/api/snack/?type=${type}`;

      const cocktailResponse = await fetch(cocktailEndpoint);
      const cocktailData = await cocktailResponse.json();
      setCocktail(cocktailData);

      const appetizersResponse = await fetch(appetizersEndpoint);
      const appetizersData = await appetizersResponse.json();
      // 처음 세 개의 안주만 가져오기
      setAppetizers(appetizersData.slice(0, 3));
    } catch (error) {
      console.error('Error fetching cocktail detail:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCocktailDetail();
  }, [cocktailId]);

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
      <div className="container"  style={{paddingRight:'42px',marginTop:'150px'} }>
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
            <h2 className="sectionTitle">Appetizers:</h2>
            <div className="appetizersContainer">
              {appetizers.map((appetizer, index) => (
                <div key={index} className="appetizerBox">
                  <img src={appetizer.image || 'default-image-url.jpg'} alt={appetizer.name} className="appetizerImage" />
                  <div>{appetizer.name}</div>
                </div>  
              ))}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default CocktailDetail;