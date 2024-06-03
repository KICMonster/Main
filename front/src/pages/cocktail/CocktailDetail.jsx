import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/CocktailDetail.css';
// axios 인스턴스 생성
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL // 백엔드 주소
  baseURL: import.meta.env.VITE_API_URL
});


function CocktailDetail() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(null);
  const [appetizers, setAppetizers] = useState([]);

  const fetchCocktailDetail = async () => {
    try {
      const cocktailEndpoint = `/cocktail/${cocktailId}`;
      const type = cocktailId % 7 + 1; // 칵테일 ID를 7로 나눈 나머지를 얻습니다.
      const appetizersEndpoint = `/snack/?type=${type}`;

      // 토큰 가져오기
      const token = localStorage.getItem('jwt') || '';
      const headers = token ? { Authorization: `Bearer ${token}` } : {};


      const cocktailResponse = await axiosInstance.get(cocktailEndpoint);
      // const cocktailData = await cocktailResponse.json();
      setCocktail(cocktailResponse.data);

      const appetizersResponse = await axiosInstance.get(appetizersEndpoint);
      // 처음 세 개의 안주만 가져오기
      setAppetizers(appetizersResponse.data.slice(0, 4));
      // 칵테일 페이지 뷰를 서버에 기록하는 POST 요청 추가
     await axiosInstance.post(`/view/cocktails/${cocktailId}`, {
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
            <h2 className="sectionTitle">사용된 재료</h2>
            <ul className="ingredientsList">
              {cocktail.ingredient1 && cocktail.measure1 && (
                <li>{cocktail.ingredient1} : {cocktail.measure1}</li>
              )}
              {cocktail.ingredient2 && cocktail.measure2 && (
                <li>{cocktail.ingredient2} : {cocktail.measure2}</li>
              )}
              {cocktail.ingredient3 && cocktail.measure3 && (
                <li>{cocktail.ingredient3} : {cocktail.measure3}</li>
              )}
              {cocktail.ingredient4 && cocktail.measure4 && (
                <li>{cocktail.ingredient4} : {cocktail.measure4}</li>
              )}
              {cocktail.ingredient5 && cocktail.measure5 && (
                <li>{cocktail.ingredient5} : {cocktail.measure5}</li>
              )}
              {cocktail.ingredient6 && cocktail.measure6 && (
                <li>{cocktail.ingredient6} : {cocktail.measure6}</li>
              )}
              {cocktail.ingredient7 && cocktail.measure7 && (
                <li>{cocktail.ingredient7} : {cocktail.measure7}</li>
              )}
              {cocktail.ingredient8 && cocktail.measure8 && (
                <li>{cocktail.ingredient8} : {cocktail.measure8}</li>
              )}
              {cocktail.ingredient9 && cocktail.measure9 && (
                <li>{cocktail.ingredient9} : {cocktail.measure9}</li>
              )}
              {cocktail.ingredient10 && cocktail.measure10 && (
                <li>{cocktail.ingredient10} : {cocktail.measure10}</li>
              )}
              {cocktail.ingredient11 && cocktail.measure11 && (
                <li>{cocktail.ingredient11} : {cocktail.measure11}</li>
              )}
              {cocktail.ingredient12 && cocktail.measure12 && (
                <li>{cocktail.ingredient12} : {cocktail.measure12}</li>
              )}
              {cocktail.ingredient13 && cocktail.measure13 && (
                <li>{cocktail.ingredient13} : {cocktail.measure13}</li>
              )}
              {cocktail.ingredient14 && cocktail.measure14 && (
                <li>{cocktail.ingredient14} : {cocktail.measure14}</li>
              )}
              {cocktail.ingredient15 && cocktail.measure15 && (
                <li>{cocktail.ingredient15} : {cocktail.measure15}</li>
              )}
            </ul>
            <h2 className="sectionTitle">칵테일 레시피</h2>
            <p className="instructions">{cocktail.instructions}</p>
            <h2 className="sectionTitle">칵테일과 어울리는 디저트</h2>
            <div className="appetizersContainer">
              {appetizers.map((appetizer, index) => {
                const truncatedName = appetizer.name.length > 8 ? `${appetizer.name.substring(0, 8)}...` : appetizer.name;
                return (
                  <Link to={`/snack/${appetizer.id}`} key={index}>
                    <div className="appetizerBox">
                      <img src={appetizer.image || 'default-image-url.jpg'} alt={appetizer.name} className="appetizerImage" />
                      <div>{truncatedName}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default CocktailDetail;