import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import Loading from './Loading';
import '../component/main/styles/AnalysisComplete.css'

function AnalysisComplete() {
  const location = useLocation();
  console.log('작동하는지확인작동하는지확인');
  console.log('Location state:', location.state);  // 콘솔에 상태 출력
  const { recommendedCocktails } = location.state || { recommendedCocktails: [] };
  const [currentCocktail, setCurrentCocktail] = useState(null);

  const selectRandomCocktail = () => {
    if (recommendedCocktails.length > 0) {
      const randomIndex = Math.floor(Math.random() * recommendedCocktails.length);
      setCurrentCocktail(recommendedCocktails[randomIndex]);
    }
  };

  useEffect(() => {
    selectRandomCocktail();
  }, [recommendedCocktails]);

  if (!currentCocktail) {
    return (
      <BasicLayout>
        <div><Loading /></div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div className="AT-container">
        <Link to={`/cocktail/${currentCocktail.id}`} key={currentCocktail.id}>
          <img src={currentCocktail.imageUrl} alt={currentCocktail.name} className="AT-cocktailImage" />
        </Link>
        <h1 className="AT-cocktailDescription">회원님에게 알맞는 칵테일은 <strong>{currentCocktail.name}</strong> 입니다!</h1>
        <button onClick={selectRandomCocktail} className="AT-button">다른 칵테일 보기</button>
      </div>
    </BasicLayout>
  );
}

export default AnalysisComplete;