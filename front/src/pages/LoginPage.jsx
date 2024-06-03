import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout';
import { SiNaver } from "react-icons/si";
import { HiMiniChatBubbleOvalLeft } from "react-icons/hi2";
import '../component/main/styles/login.css';
import EmailForm from '../component/login/EmailVerification';
import kakaoIcon from '../img/kakao_medium.png';
import naverIcon from '../img/btn_naver.png';
import googleIcon from '../img/google_btn.png';

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';

function LoginPage() {
  const [isEmailVerification, setIsEmailVerification] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 위한 함수 가져오기

  const socialConfig = {
    kakaoKey: import.meta.env.VITE_KAKAO_REST_API_KEY,
    kakaoRedirectURI: import.meta.env.VITE_KAKAO_REDIRECT_URI,
    googleKey: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    googleRedirectURI: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    naverKey: import.meta.env.VITE_NAVER_CLIENT_ID,
    naverRedirectURI: import.meta.env.VITE_NAVER_REDIRECT_URI,
    naverSecretkey: import.meta.env.VITE_NAVER_CLIENT_SECRET
  }
  // 환경 변수에서 각 소셜 로그인 관련 정보 가져오기

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${socialConfig.kakaoKey}&redirect_uri=${socialConfig.kakaoRedirectURI}&response_type=code&scope=account_email,openid,profile_nickname`;
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${socialConfig.googleKey}&redirect_uri=${socialConfig.googleRedirectURI}&response_type=code&scope=openid%20profile%20email`
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${socialConfig.naverKey}&redirect_uri=${socialConfig.naverRedirectURI}&state=STATE_STRING`;

  useEffect(() => {
    const getCodeFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('code');
    };

    // URL에서 서비스명 추출 (예: /login/auth/kakao, /login/auth/google, /login/auth/naver)
    // URL 경로를 '/'로 분할하여 배열을 생성하고, 서비스명을 포함하는 부분을 추출합니다.
    const pathSegments = window.location.pathname.split('/').filter(Boolean); // 불필요한 빈 문자열 제거
    const serviceIndex = pathSegments.findIndex(segment => ['kakao', 'google', 'naver'].includes(segment)); // 'kakao', 'google', 'naver' 중 하나가 포함된 세그먼트의 인덱스 찾기
    const service = serviceIndex !== -1 ? pathSegments[serviceIndex] : null; // 서비스명이 포함된 세그먼트가 있으면 해당 값을 사용하고, 아니면 null을 할당
    const code = getCodeFromUrl();

    if (code && service) {
      // 인가 코드로 Access Token 요청
      getAccessToken(code, service);
    } else {
      console.error('Unsupported service or missing authorization code', service);
    }
  }, []);
 
  const getAccessToken = async (authCode, service) => {
    let access_token_uri;
    let body;
  
    switch (service) {
      case 'kakao':
        access_token_uri = 'https://luvcocktail.site/token/kakao';
        body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: socialConfig.kakaoKey,
          redirect_uri: socialConfig.kakaoRedirectURI,
          client_secret: '6bX9xJgRVwbFUApqPU0fi3nEiWjNY4Cd',
          code: authCode
        });
        break;
      case 'google':
        access_token_uri = 'https://oauth2.googleapis.com/token';
        body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          code: authCode
        });
        break;
      case 'naver':
        // 프록시를 통해 네이버 OAuth 요청을 처리하도록 수정
        access_token_uri = 'https://luvcocktail.site/token/naver';
        body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: socialConfig.naverKey,
          client_secret: socialConfig.naverSecretkey,
          redirect_uri: socialConfig.naverRedirectURI,
          state: 'STATE_STRING',
          code: authCode
        });
        break;
      default:
        console.error('Unsupported service');
        return;
    }
  
    try {
      const response = await axios.post(access_token_uri, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
  
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
  
      console.log('발급된 Access Token:', accessToken);
  
      // 액세스 토큰을 백엔드로 전송
      sendAccessTokenToBackend(accessToken, service);
    } catch (error) {
      console.error('Access Token 요청 중 오류 발생:', error);
    }
  };
  
  const sendAccessTokenToBackend = async (accessToken, service) => {
    try {
      const response = await axios.post(
        'https://luvcocktail.site/api/authenticate',
        {
          accessToken: accessToken,
          service: service
        },
        {
          headers: {
            'Content-Type': 'application/json' // JSON 형식으로 전송합니다.
          },
          withCredentials: true // withCredentials 옵션은 여기에 포함
        }
      );


      console.log('전송된 Access Token:', accessToken);
      console.log('전송된 서비스', service);

      console.log('백엔드 응답:', response.data);
      // 로그인 처리 완료 후 다음 동작 수행
      // 예: 로그인 완료 후 리다이렉트 등
      // jwtAccessToken이 존재하는지 확인
      if (response.data && response.data.jwtAccessToken) {
        console.log('로그인 성공:', response.data);
        localStorage.setItem('jwt', response.data.jwtAccessToken); // JWT 토큰 저장
        navigate('/');
      } else {
        // jwtAccessToken이 없는 경우 에러 처리
        throw new Error('jwtAccessToken이 없습니다.');
      }
    } catch (error) {
      console.error('백엔드로 사용자 정보 전송 중 오류 발생:', error);
      alert('에러가 발생하여 로그인 페이지로 돌아갑니다.');
      navigate('/login');
    }
  };


  const handleEmailVerification = () => {
    setIsEmailVerification(true); // 이메일 확인 상태를 true로 변경
  };


  function LoginHeader({ isChange }) {
    return (
      <div className='LoginHeader'>
        <nav className='login-btn' style={{ marginRight: '0px' }}>
          <button className='no__btn'>{isChange ? 'Verify your email' : 'Login'}</button>
        </nav>
      </div>
    );
  }
  
  function LoginMain({ isChange, handleEmailVerification }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.post('https://luvcocktail.site/api/login', {
          email: email,
          password: password
        });
    
        if (response.data && response.data.jwtAccessToken) {
          console.log('로그인 성공:', response.data);
          localStorage.setItem('jwt', response.data.jwtAccessToken); // JWT 토큰 저장
          navigate('/');
        } else {
          throw new Error('jwtAccessToken이 없습니다.');
        }
      } catch (error) {
        console.error('로그인 요청 중 오류 발생:', error);
        alert('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
      }
    };
  
    if (!isChange) {
      return (
        <main className='wrapper'>
          <form style={{ width: '100%' }} onSubmit={handleLoginSubmit}>
            <div className="LoginMainBody">
              <input
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Email"
                className='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input type="password" id="password" name="password" autoComplete="current-password" placeholder={"Password"} className='pass'  value={password}
              onChange={(e) => setPassword(e.target.value)}required/>
            </div>
            <div className='find-btn'><p>Forgot password?</p></div>
            <button type='submit' className='origin__btn' style={{ marginTop: '20px' }}>Login</button>
          </form>
        </main >
      );
    } else {
      return (
        <EmailForm handleEmailVerification={handleEmailVerification} />
      );
    }
  }
  
  function LoginFooter({ isChange }) {
    if (!isChange) {
      return (
        <footer>
          <div className='LoginFooter'>
            <p>OR Login with</p>
          </div>
          <div className='btn-container'>
            {/*  google button */}
            <button className='google__btn' >
              <Link to={GOOGLE_AUTH_URL}><img className='icon' src={googleIcon} alt="googleIcon" /></Link>
            </button>
  
            {/*  kakao button */}
            <button className='kakao__btn' >
              <Link to={KAKAO_AUTH_URL}><img className='icon' src={kakaoIcon} alt="kakaoIcon" /></Link>
            </button>
  
            {/*  naver button */}
            <button className='naver__btn' >
              <Link to={NAVER_AUTH_URL}><img className='icon' src={naverIcon} alt="naverIcon" /></Link>
            </button>
          </div>
        </footer>
      );
    } else {
      return null; // 이메일 폼으로 넘어갈 때 푸터를 숨깁니다.
    }
  }
  const [isChange, setisChange] = useState(false);

    return (
    <BasicLayout>
      <div className="Login">
        <div className='logingrid'>
          {!isEmailVerification && <LoginHeader isChange={isChange} />}
          <LoginMain isChange={isChange} handleEmailVerification={handleEmailVerification} />
          {!isEmailVerification && <LoginFooter isChange={isChange} />}
          {!isEmailVerification && !isChange && ( // 이메일 인증이 필요하고 변경 상태가 아닐 때만 버튼을 보여줍니다.
            <div className="join-container">
              <p>You don't have an account yet?</p>
              <div className='join-btn'>
                <p onClick={() => setisChange(true)}>SignUp</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ BasicLayout>
  );
}
export default LoginPage;