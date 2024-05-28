import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCodeForm = ({ authCode, setAuthCode, onVerified }) => {

    const navigate = useNavigate(); 

    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        return Math.max(0, expirationTime - now);
      };

    const [expirationTime, setExpirationTime] = useState(new Date().getTime() + 5 * 60 * 1000); // 현재 시간에서 5분 후로 설정
   const [remainingTime, setRemainingTime] = useState(calculateRemainingTime()); // 남은 시간 상태

 

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateRemainingTime();
      if (remaining <= 0) {
        clearInterval(timer);
        alert("세션이 만료되었습니다. 다시 요청해 주세요.");
        window.location.href = "/join";
        // 타이머 만료 시 처리할 로직 추가 (예: 만료 메시지 출력, 인증 코드 재요청 등)
      } else {
        setRemainingTime(remaining);
      }
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [expirationTime]); // expirationTime이 변경될 때마다 useEffect 재실행

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${minutes}분 ${seconds}초`;
  };

    

    const handleAuthCodeChange = (e) => {
      setAuthCode(e.target.value);
    };
  
    return (
      <div>
        <input
          type="text"
          value={authCode}
          onChange={handleAuthCodeChange}
          required
        />
        <button onClick={onVerified}>인증 완료</button>
        <p>만료 시간: {formatTime(remainingTime)}</p>
      </div>
    );
  };
        
export default AuthCodeForm;