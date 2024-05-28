import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import root from './router/root';
import Loading from './pages/Loading';  // 로딩 컴포넌트 임포트

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // 0.5초 후에 로딩 해제
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <RouterProvider router={root} />
  );
}

export default App;
