import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  '../main/styles/authCodeForm.css';


const AuthCodeForm = ({ authCode, setAuthCode, onVerified }) => {

    const navigate = useNavigate(); 
    const [code, setCode] = useState(new Array(6).fill(''));

    const calculateRemainingTime = () => {
        const now = new Date().getTime();
        return Math.max(0, expirationTime - now);
      };

    const [expirationTime, setExpirationTime] = useState(new Date().getTime() + 5 * 60 * 1000); // 현재 시간에서 5분 후로 설정
   const [remainingTime, setRemainingTime] = useState(calculateRemainingTime()); // 남은 시간 상태

      
   const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) { // Only accept digits
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setAuthCode(newCode.join(''));

      // Move to the next input field if the current one is filled
      if (value !== '' && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };
   

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

    

    return (
      <div className='code-box'>
        <div className="code-inputs">
        {code.map((digit, idx) => (
          <input
            key={idx}
            id={`code-${idx}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            maxLength="1"
            className="code-input"
            required
          />
        ))}
      </div>

        <p>인증코드 만료까지: {formatTime(remainingTime)}</p> 
        <button className='ver-btn' onClick={onVerified}>인증 완료</button>
         
      </div>
    );
  };
        
export default AuthCodeForm;