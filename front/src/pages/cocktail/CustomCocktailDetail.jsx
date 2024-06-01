
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/CustomCocktailDetail.css';
import Loading from "../Loading";
// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


function CustomCocktailDetail() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(0);
  const [hasRecommended, setHasRecommended] = useState(false); // 사용자가 이미 추천을 눌렀는지 여부

  const fetchCocktailDetail = async () => {
    try {
      const cocktailEndpoint = `/api/custom/${cocktailId}`;
      const cocktailResponse = await axiosInstance.get(cocktailEndpoint);
      // const cocktailData = await cocktailResponse.json();
      setCocktail(cocktailResponse.data);

      // 토큰 가져오기
      const token = localStorage.getItem('jwt') || '';
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axiosInstance.post(`/view/custom/cocktails/${cocktailId}`, {
        timestamp: new Date().toISOString()
      }, { headers });

    } catch (error) {
      console.error('Error fetching cocktail detail:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCocktailDetail();
  }, [cocktailId]);

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
        <div><Loading /></div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div className="container" style={{ paddingRight:'42px', marginTop:'150px' }}>
        <div className="leftColumn" style={{ gridColumn: '1 / 4' }}>
          <div className="imageBox">
            <img src={cocktail.customImageUrl} alt={cocktail.customNm} className="cocktailImage" />
          </div>
        </div>
        <div className="rightColumn" style={{ gridColumn: '4 / span 3' }}>
          <div className="contentBox">
            <h1 className="cocktailName">{cocktail.customNm}</h1>
            <hr className="divider" />
            <p className="cocktailDescription">{cocktail.description}</p>
            <h2 className="sectionTitle">Ingredients:</h2>
            <ul className="ingredientsList">
                {cocktail.customIngredient1 && cocktail.customMeasure1 && (
                  <li>{cocktail.customIngredient1} : {cocktail.customMeasure1}</li>
                )}
                {cocktail.customIngredient2 && cocktail.customMeasure2 && (
                  <li>{cocktail.customIngredient2} : {cocktail.customMeasure2}</li>
                )}
                {cocktail.customIngredient3 && cocktail.customMeasure3 && (
                  <li>{cocktail.customIngredient3} : {cocktail.customMeasure3}</li>
                )}
                {cocktail.customIngredient4 && cocktail.customMeasure4 && (
                  <li>{cocktail.customIngredient4} : {cocktail.customMeasure4}</li>
                )}
                {cocktail.customIngredient5 && cocktail.customMeasure5 && (
                  <li>{cocktail.customIngredient5} : {cocktail.customMeasure5}</li>
                )}
                {cocktail.customIngredient6 && cocktail.customMeasure6 && (
                  <li>{cocktail.customIngredient6} : {cocktail.customMeasure6}</li>
                )}
                {cocktail.customIngredient7 && cocktail.customMeasure7 && (
                  <li>{cocktail.customIngredient7} : {cocktail.customMeasure7}</li>
                )}
                {cocktail.customIngredient8 && cocktail.customMeasure8 && (
                  <li>{cocktail.customIngredient8} : {cocktail.customMeasure8}</li>
                )}
                {cocktail.customIngredient9 && cocktail.customMeasure9 && (
                  <li>{cocktail.customIngredient9} : {cocktail.customMeasure9}</li>
                )}
                {cocktail.customIngredient10 && cocktail.customMeasure10 && (
                  <li>{cocktail.customIngredient10} : {cocktail.customMeasure10}</li>
                )}
                {cocktail.customIngredient11 && cocktail.customMeasure11 && (
                  <li>{cocktail.customIngredient11} : {cocktail.customMeasure11}</li>
                )}
                {cocktail.customIngredient12 && cocktail.customMeasure12 && (
                  <li>{cocktail.customIngredient12} : {cocktail.customMeasure12}</li>
                )}
                {cocktail.customIngredient13 && cocktail.customMeasure13 && (
                  <li>{cocktail.customIngredient13} : {cocktail.customMeasure13}</li>
                )}
                {cocktail.customIngredient14 && cocktail.customMeasure14 && (
                  <li>{cocktail.customIngredient14} : {cocktail.customMeasure14}</li>
                )}
                {cocktail.customIngredient15 && cocktail.customMeasure15 && (
                  <li>{cocktail.customIngredient15} : {cocktail.customMeasure15}</li>
                )}
            </ul>
            <h2 className="sectionTitle">이 칵테일을 추천합니다</h2>
            <p className="instructions">{cocktail.instructions}</p>
            <h2 className="sectionTitle"></h2>
            <div>
              <button onClick={handleRecommendation} disabled={hasRecommended}>👍</button>
              <span>{recommendation}</span>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default CustomCocktailDetail;