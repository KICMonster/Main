import React from 'react';
import Home from '../pages/Home';
import EmailForm from '../component/login/EmailVerification';




const LoginRouter = () => {
  return [{
    path : 'auth/kakao/callback',
    element : <Home />
  },
  {
    path : 'auth/google/callback',
    element : <Home />,
  },
  {
    path : 'auth/naver/callback',
    element : <Home />,
  },
  {
    path : 'emailVar',
    element : <EmailForm/>
  },
];
};

export default LoginRouter;