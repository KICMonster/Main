import React, { useState, useEffect, useRef } from "react";
import DynamicHeader from "../component/main/DynamicHeader";
import Loading from "../pages/Loading";

function BasicLayout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 0.5초 후에 로딩 상태 해제
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 헤더 영역 */}
      <div className="header">
        <DynamicHeader />
      </div>
      <div className="info">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {children}
          </>
        )}
      </div>
      <footer className="footer">
        <div style={{display: 'flex'}}>
        <a >김태연</a>
        <a >손은영</a>
        <a >임현민</a>
        <a >유명준</a>
        <a >정해랑</a>
        <a >신동준</a>
        <div></div>
        <p>© 2024 Your Company. All rights reserved. Icons by <a href="https://dribbble.com/">Dribbble</a> and <a href="https://codepen.io/">CodePen</a>.</p>
        </div>
        
      </footer>
    </>
  );
}

export default BasicLayout;