import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BasicLayout from '../../layouts/BasicLayout';
import AnalysisComplete from '../../pages/AnalysisComplete';
import OptionSelector from '../../pages/contents/Taste';




const TasteAnalysis = () => {
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');
  const [tasteString, setTasteString] = useState('');
  const navigate = useNavigate();
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // 선택 완료 상태 추가

  useEffect(() => {
    const handleTasteSubmit = async () => {
      if (!tasteString) return; // tasteString이 비어있다면 아무것도 하지 않음
      try {
        console.log(`Sending tasteString: ${tasteString}`);
        console.log(`Sending with token: ${token}`);
        const response = await axios.post(
          'https://localhost:9092/search/updateTasteAndRecommend',
          JSON.stringify({ tasteString: tasteString }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          // JSON 형식의 응답 데이터를 사용
          const recommendedCocktails = response.data;
          console.log('Recommended cocktails:', recommendedCocktails);
           // navigate 함수 호출 시, 두 번째 인자로 상태 전달
          navigate("/taste/complete", { state: { recommendedCocktails } });
          
        }
      } catch (error) {
        console.error('Error updating taste and recommendation:', error);
      }
    };

    if (tasteString) { // tasteString이 비어있지 않을 때만 실행
      handleTasteSubmit();
    }
  }, [tasteString, token]); // tasteString 또는 token이 변경될 때만 이 useEffect 실행

  const handleOptionSelectionComplete = (selectedTasteString) => {
    setTasteString(selectedTasteString);
    setIsSelectionComplete(true); // 선택 완료 상태를 true로 설정
  };

  return (
    <BasicLayout >
    {!isSelectionComplete && <OptionSelector onSelectionComplete={handleOptionSelectionComplete} />}
    {isSelectionComplete && <AnalysisComplete/>}
    </ BasicLayout >
  );
};

export default TasteAnalysis;