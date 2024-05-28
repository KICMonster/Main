import React from 'react';
import { useLocation } from 'react-router-dom';

/**@todo_결과도출값.실제API에서 불러오는 값에 맞춰 변경할것. CSS 추가작업과 다른경로 
 * 이동버튼 혹은 팝업창으로 구현할 경우 그에 맞게 이동방식 등 수정 필요 */
function AnalysisComplete() {
  const location = useLocation();
  const { recommendedCocktails } = location.state || { recommendedCocktails: [] }; // 상태가 없는 경우를 대비한 기본값 설정
  console.log(recommendedCocktails);

  return (
    <div>
      {recommendedCocktails.length > 0 ? (
        <div>
          {recommendedCocktails.map((cocktail, index) => (
            <div key={index}>
              <h2>{cocktail.name}</h2>
              <p>재료1: {cocktail.ingredient1}</p>
              <p>재료2: {cocktail.ingredient2}</p>
              <p>재료3: {cocktail.ingredient3}</p>
              <p>알코올 도수: {cocktail.alcohol_content}%</p>
            </div>
          ))}
        </div>
      ) : (
        <div>로딩 중...</div> // 로딩 이미지나 애니메이션을 여기에 추가
      )}
    </div>
  );
}

export default AnalysisComplete;