import React, { useState, useEffect } from 'react';
import options from '../../data/questionData.json';
import "../contents/Taste.css";
import { useNavigate } from 'react-router-dom';

const Taste = ({ onSelectionComplete }) => {
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [question, setQuestion] = useState("오늘은 불금! 술이 땡기는 당신, 어느곳에서 불금을 즐길건가요 ?");
  const [imageUrl, setImageUrl] = useState("https://skybory-bucket.s3.ap-northeast-2.amazonaws.com/monster/enquete/1.png");

  const navigate = useNavigate();
  useEffect(() => {
    
    const jwtToken = localStorage.getItem("jwt");
    // JWT 토큰 확인
    if (!jwtToken) {
      alert("로그인한 회원만 등록 버튼을 누를 수 있습니다!");
      navigate("/login"); // navigate 사용
    }
  }, [navigate]);

  useEffect(() => {
    const initialOptions = options.slice(0, 2);
    setCurrentOptions(initialOptions);
  }, []);

  const handleOptionClick = (selectedOptionId) => {
    setSelectedOptionIds(prevIds => {
      const updatedIds = [...prevIds, selectedOptionId];
      
      const selectedOption = options.find(option => option.id === selectedOptionId);
      if (selectedOption.nextOptions) {
        const nextOptionsIds = selectedOption.nextOptions;
        const nextOptions = options.filter(option => nextOptionsIds.includes(option.id));
        setCurrentOptions(nextOptions);
        setQuestion(nextOptions[0].question); // 다음 질문으로 업데이트
        if (nextOptions[0].image) {
          setImageUrl(nextOptions[0].image); // 다음 질문에 해당하는 이미지로 업데이트
        } else {
          setImageUrl(""); // 이미지가 없으면 빈 문자열로 설정
        }
      } else {
        setCurrentOptions([]);
        const tasteString = updatedIds.join('.');
        onSelectionComplete(tasteString);
      }
      
      return updatedIds;
    });
  };

  return (
    <div className="option-selector-wrapper">
      <div className="question-box">{question}</div>
      {imageUrl && ( // 이미지 URL이 있을 때만 이미지 렌더링
        <img 
          src={imageUrl} 
          alt="Survey related"
          className="survey-image"
        />
      )}
      <div className="option-selector-container">
        {currentOptions.map(option => (
          <button 
            className="option-button font" 
            key={option.id} 
            onClick={() => handleOptionClick(option.id)}
            style={{ transition: "background-color 0.3s, transform 0.3s" }} // 부드러운 전환 효과 추가
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Taste;