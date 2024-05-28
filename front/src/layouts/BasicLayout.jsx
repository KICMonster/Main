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
        <a href="/#">고객센터</a>
      </footer>
    </>
  );
}

export default BasicLayout;