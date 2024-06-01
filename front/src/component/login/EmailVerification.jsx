import React, { useState } from 'react';
import AuthCodeForm from './AuthCodeForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const EmailForm = () => {

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 초기화

  const [email, setEmail] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [domainOption, setDomainOption] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부를 추적하는 새로운 상태
  const [authCode, setAuthCode] = useState('');
 

  const isEmailVerifiednav = () => {
    navigate(`/additional?email=${email}@${emailDomain}`);
  };

  const validateInput = (input) => {
    // 특수 문자와 한글을 제외한 문자만 허용하는 정규식
    const regex = /^[a-zA-Z0-9@.]*$/;
    return regex.test(input);
  };
  
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    if (validateInput(inputValue)) {
      setEmail(inputValue);
    }
  };

  const handleDomainChange = (e) => {
    setEmailDomain(e.target.value);
  };

  const handleDomainOptionChange = (e) => {
    const selectedOption = e.target.value;
    setDomainOption(selectedOption);

    if (selectedOption === 'direct') {
      setEmailDomain('');
    } else {
      setEmailDomain(selectedOption);
    }
  };

  // 이메일 형식 유효성 검사 함수
const isValidEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  const handleVerifyEmail = async () => {
    const fullEmail = `${email}@${emailDomain}`;
  
    // 이메일 형식 유효성 검사
    if (!isValidEmailFormat(fullEmail)) {
      alert('적합한 이메일 형식이 아닙니다.');
      return; // 유효하지 않은 형식일 경우 함수 실행 중단
    }
    let status;
    try {
      // Use axiosInstance to post data. Note that data should be passed directly, not inside a body property.
      const response = await axiosInstance.post('/join/emails/verification-requests', { email: fullEmail });
    
      // Axios uses status codes, but does not have an 'ok' property. Instead, check if the status code is 200.
      if (response.status === 200) {
        alert('인증 코드가 전송되었습니다. 이메일을 확인해주세요.');
        setIsCodeSent(true);
      } else {
        // Handle non-200 responses here
        throw new Error('이메일 인증 실패');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('이미 가입된 이메일입니다.');
        navigate("/login");
      } else {
        console.error('Unexpected error:', error);
        alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요. 계속해서 발생할 경우 고객센터에 문의해주세요.');
      }
    }
    }
    const onVerified = async () => {
      setIsCodeSent(true); // 더 이상 인증 코드 폼을 보여줄 필요가 없음
    
      const fullEmail = `${email}@${emailDomain}`;
    
      try {
        // Use axiosInstance to get data. Axios automatically handles JSON parsing.
        const response = await axiosInstance.get(`/join/emails/verifications?email=${encodeURIComponent(fullEmail)}&code=${authCode}`);
    
        if (response.status === 200) {
          setIsVerified(true);
          alert('이메일이 성공적으로 인증되었습니다.');
          isEmailVerifiednav(); // 이메일 인증 상태를 업데이트
        } else {
          // Handle cases where the HTTP status code is not 200
          throw new Error(response.data.message || '인증에 실패했습니다.');
        }
      } catch (error) {
        console.error('이메일 인증 실패:', error);
        if (error.response && error.response.status === 422) {
          alert("인증코드가 일치하지 않습니다.");
        } else {
          alert("예상치 못한 문제가 발생하였습니다. 다시 시도해 주십시오.");
        }
      }
    };

  return (
    <div>
      <div className='emailform'>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder='email'
        />
        <strong>@</strong>
        <input
          type="text"
          id="emailDomain"
          value={emailDomain}
          onChange={handleDomainChange}
          disabled={domainOption !== 'direct'}
          required
        />
        <select className='select' onChange={handleDomainOptionChange} value={domainOption}>
          <option value="">선택하세요</option>
          <option value="direct">직접 입력</option>
          <option value="naver.com">네이버</option>
          <option value="gmail.com">구글</option>
          <option value="daum.net">다음</option>
        </select>
      </div>
      <div>
        {isCodeSent && !isVerified ? (
          <AuthCodeForm
            authCode={authCode}
            setAuthCode={setAuthCode}
            onVerified={onVerified}
          />
        ) : (
          <button onClick={handleVerifyEmail} className='origin__btn'>인증 코드 받기</button>
        )}
      </div>
    </div>
  );
};

export default EmailForm;