import React from 'react';
import { Link } from 'react-router-dom';
import BasicLayout from "../../layouts/BasicLayout";
import "../contents/TasteStart.css";

function TasteStart() {
  return (
    <BasicLayout>
      <div className="board">
        <div className="survey-container">
          <h2>당신만을 위한 추천 칵테일!</h2>
          <h1>내 취향의 칵테일 찾기</h1>
          <div className="survey-instructions">
            <div>
              <span>2 min</span>
              <p>질문은 8개, 2분이면 OK!</p>
            </div>
            <div>
              <span>&#x2713;</span>
              <p>두개의 선택지로 답변을 빠르게!</p>
            </div>
            <div>
              <span>🍾</span>
              <p>테스트 후엔 취향 칵테일 추천!</p>
            </div>
          </div>
          <span><img src="https://media.tenor.com/nE7CE32ElmMAAAAM/leonardo-di-caprio-cheers.gif" alt="survey-image" /></span>
          <div className="survey-start">
            <Link to="/taste">시작하기</Link>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default TasteStart;