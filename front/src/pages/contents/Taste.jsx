import React, { useState, useEffect } from 'react';
import options from '../../data/questionData.json';
import "../contents/taste.css";

const OptionSelector = ({ onSelectionComplete }) => {
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [question, setQuestion] = useState("오늘은 불금! 술이 땡기는 당신, 어느곳에서 술을 즐길건가요 ?"); // 초기 질문 설정

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
      <img 
        src="https://example.com/your-image.jpg" // 원하는 이미지 URL로 변경
        alt="Survey related"
        className="survey-image"
      />
    </div>
  );
};

export default OptionSelector;