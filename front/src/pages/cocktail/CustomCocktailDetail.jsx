import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import Loading from "../Loading";
import '../../component/main/styles/CocktailDetail.css'

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
      const cocktailEndpoint = `/custom/${cocktailId}`;
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

  // 삭제 함수
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('jwt') || '';
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axiosInstance.delete(`/custom/${cocktailId}`, { headers });
      // 삭제 후 리다이렉트 또는 다른 작업을 수행할 수 있음
    } catch (error) {
      console.error('Error deleting cocktail:', error);
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
      <div className="container" style={{ paddingRight: '42px', marginTop: '150px' }}>
        <div className="leftColumn" style={{ gridColumn: '1 / 4' }}>
          <div className="imageBox">
            <img src={cocktail.customImageUrl} alt={cocktail.customNm} className="cocktailImage2" />
            <button onClick={handleRecommendation} className="iconFathum" disabled={hasRecommended}>👍</button>
          </div>
        </div>
        <div className="rightColumn" style={{ gridColumn: '4 / span 3' }}>
          <div className="contentBox">
            <h1 className="cocktailName">{cocktail.customNm}</h1>
            <p className="cocktailViews">조회수 : {cocktail.view}</p> {/* 조회수 추가 */}
            <p className="cocktailRecommend">추천수 : {cocktail.recommend}</p> {/* 추천수 추가 */}
            <hr className="divider" />
            <p className="cocktailDescription">{cocktail.description}</p>
            <h2 className="sectionTitle">사용된 재료</h2>
            <ul className="ingredientsList">
              {Array.from(Array(15).keys()).map(index => {
                const ingredientKey = `customIngredient${index + 1}`;
                const measureKey = `customMeasure${index + 1}`;
                return (
                  cocktail[ingredientKey] && cocktail[measureKey] && (
                    <li key={index}>{cocktail[ingredientKey]} : {cocktail[measureKey]}</li>
                  )
                );
              })}
            </ul>
            <h2 className="sectionTitle">칵테일 레시피</h2>
            <p className="cocktailRecipe">{cocktail.customRcp}</p> {/* 제조법 추가 */}
            {/* <p className="instructions">{cocktail.instructions}</p> instructions 삭제. 이게 제조법임 (변수명 맞춰야함) */}
            <h2 className="sectionTitle"></h2>
            <span style={{ float: 'right' }}>
              { /* 수정 가능한 페이지로 이동하는 링크 추가 */}
              <Link to={`/cocktail/EditCocktail`} className="edit-button">수정하기</Link>
              <button onClick={handleDelete} className="delete-button">삭제하기</button>
            </span>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default CustomCocktailDetail;
