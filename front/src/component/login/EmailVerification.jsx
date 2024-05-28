import React, { useState } from 'react';
import AuthCodeForm from './AuthCodeForm';
import { useNavigate } from 'react-router-dom';

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
         
        const response = await fetch('https://localhost:9092/join/emails/verification-requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: fullEmail }),
        });
        status = response.status; // 응답으로부터 상태 코드 저장
      
        if (response.ok) {
          // 응답이 성공적인 경우에만 실행되는 부분
          alert('인증 코드가 전송되었습니다. 이메일을 확인해주세요.');
          setIsCodeSent(true); // 여기에 코드를 추가하여 상태를 업데이트함
        } else {
            // 서버에서 에러 코드로 응답할 경우, 여기서 처리
            const error = await response.json();
            console.error('이메일 인증 실패:', error.message);
            throw new Error(error.message); // 적절한 에러 메시지와 함께 예외를 던짐
          }
        } catch (error) {
          if (status === 409) {
            alert('이미 가입된 이메일입니다. 로그인페이지로 돌아갑니다.');
            navigate("/login");
          } else {
            // fetch 요청 실패 또는 서버에서 409 외 다른 에러 코드로 응답한 경우의 처리
            console.error('Unexpected error:', error);
            alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요. 계속해서발생할경우 고객센터에 문의해주세요.');
          }
        }
    }
  const onVerified = async () => {
    setIsCodeSent(true); // 인증이 성공하여 더 이상 인증 코드 폼을 보여줄 필요가 없음
    
    const fullEmail = `${email}@${emailDomain}`;

    try {
      const response = await fetch(`https://localhost:9092/join/emails/verifications?email=${encodeURIComponent(fullEmail)}&code=${authCode}`, {
        method: 'GET',
      });

      
      if (response.ok) {
        setIsVerified(true);
        alert('이메일이 성공적으로 인증되었습니다.');
        isEmailVerifiednav();// 이메일 인증 상태를 업데이트
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('이메일 인증 실패:', error);
      alert('이메일 인증에 실패했습니다.');
    }
  };

  return (
    <div>
      <label htmlFor="email">이메일</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
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
      <select onChange={handleDomainOptionChange} value={domainOption}>
        <option value="">선택하세요</option>
        <option value="direct">직접 입력</option>
        <option value="naver.com">네이버</option>
        <option value="gmail.com">구글</option>
        <option value="daum.net">다음</option>
      </select>
      
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
    
  );
};

export default EmailForm;