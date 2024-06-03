import React from 'react';
import '../main/styles/Grid.css';
import { Link } from 'react-router-dom';
import Loading from '../../pages/Loading';

function Grid({ cocktails }) {
  // 칵테일 데이터가 존재하지 않는 경우 대비
  if (!cocktails || !Array.isArray(cocktails) || cocktails.length === 0) {
    return <Loading />;
  }

  // 칵테일 배열을 두 배로 연장하여 슬라이더에 연속된 느낌을 줄 수 있도록 설정
  const doubledCocktails = cocktails.concat(cocktails);

  return (
    <>
      <div className="container" style={{ display: 'flex' }}>
        <div className="home-container">
          <h1 className="font">당신을 위한 칵테일</h1>
          <div>"지친 하루의 끝, 한 잔의 칵테일과 함께하는 시간. LuvCocktail은 당신의 순간을 특별하게 만듭니다. 오늘의 이야기를 내일의 추억으로."</div>
          <Link to="/tastestart"><button className="btn-hover">취향 조사</button></Link>
        </div>
      </div>
      <div className="slider-container">
        <div className="slider-track">
          {doubledCocktails.map((cocktail, index) => (
            <Link key={`${cocktail.id}-${index}`} to={`/cocktail/${cocktail.id}`} className="cocktail-link">
              <div className="slider-items">
                <div className="image-box">
                  <img src={cocktail.imageUrl || 'default-image-url.jpg'} alt={cocktail.name} className="cocktailImage" />
                </div>
                <div className="cocktail-details">
                  <p>{cocktail.name}</p>
                  <p>{cocktail.ingredient1}</p>
                  {/* 원하는 다른 설명도 추가할 수 있습니다 */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Grid;

