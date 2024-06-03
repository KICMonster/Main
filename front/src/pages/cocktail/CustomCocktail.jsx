import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";
import axios from 'axios';
import "../../component/main/styles/ViewPage.css"; // CSS 파일을 import
import '../../component/main/styles/CocktailDetail.css';
import { IoEyeSharp } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL // 백엔드 주소
  baseURL: import.meta.env.VITE_API_URL
});

function CustomCocktail() {
  const [cocktails, setCocktails] = useState([]);
  const [baseFilter, setBaseFilter] = useState('');
  const [alcoholFilter, setAlcoholFilter] = useState('');
  const [glassFilter, setGlassFilter] = useState(''); // 사용된 컵 필터 상태 추가
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [uniqueGlasses, setUniqueGlasses] = useState([]); // 고유한 유리잔 종류 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹 상태 추가
  const [sortOption, setSortOption] = useState(''); // 정렬 옵션 상태 추가
  const itemsPerPage = 10;

  const fetchAllCocktails = async () => {
    try {
      const endpoint = '/custom';
      const response = await axiosInstance.get(endpoint);
      const data = response.data;
      const shuffledData = shuffleArray(data);
      setCocktails(shuffledData);

      // 모든 고유한 리큐르 추출
      const uniqueIngredients = [...new Set(data.map(cocktail => cocktail.ingredient1))];
      setUniqueIngredients(uniqueIngredients);

      // 모든 고유한 유리잔 종류 추출
      const uniqueGlasses = [...new Set(data.map(cocktail => cocktail.glass))];
      setUniqueGlasses(uniqueGlasses);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  useEffect(() => {
    fetchAllCocktails();
  }, []);

  // 배열을 셔플하는 함수
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 필터링된 칵테일 목록을 계산
  const filteredCocktails = cocktails.filter(cocktail => {
    const baseMatch = baseFilter === '' || cocktail.ingredient1 === baseFilter;
    const alcoholMatch = alcoholFilter === '' || (alcoholFilter === 'Alcoholic' && cocktail.alcoholic === 'Alcoholic') || (alcoholFilter === 'Non alcoholic' && cocktail.alcoholic === 'Non alcoholic');
    const glassMatch = glassFilter === '' || cocktail.glass === glassFilter;
    return baseMatch && alcoholMatch && glassMatch;
  });

  // 필터링 및 정렬된 칵테일 목록을 계산
  const filteredAndSortedCocktails = filteredCocktails.sort((a, b) => {
    if (sortOption === 'recommendation') {
      return b.recommendationCount - a.recommendationCount; // 추천수 기준 내림차순 정렬
    } else if (sortOption === 'views') {
      return b.viewCount - a.viewCount; // 조회수 기준 내림차순 정렬
    }
    return 0;
  });

  // 현재 페이지에 해당하는 칵테일 목록 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedCocktails.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredAndSortedCocktails.length / itemsPerPage);
  const pagesPerGroup = 5; // 한 페이지 그룹당 페이지 수

  // 페이지 이동 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 그룹 이동 함수
  const handlePageGroupChange = (direction) => {
    if (direction === 'next' && (pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * pagesPerGroup + 1);
    } else if (direction === 'prev' && pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage(pageGroup * pagesPerGroup + 1);
    }
  };

  // 베이스주 필터 설정 함수
  const handleBaseFilterChange = (event) => {
    setBaseFilter(event.target.value);
    setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 설정
    setPageGroup(0); // 필터 변경 시 페이지 그룹을 첫 그룹으로 설정
  };

  // 알콜/논알콜 필터 설정 함수
  const handleAlcoholFilterChange = (event) => {
    setAlcoholFilter(event.target.value);
    setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 설정
    setPageGroup(0); // 필터 변경 시 페이지 그룹을 첫 그룹으로 설정
  };

  // 사용된 컵 필터 설정 함수
  const handleGlassFilterChange = (event) => {
    setGlassFilter(event.target.value);
    setCurrentPage(1); // 필터 변경 시 페이지를 첫 페이지로 설정
    setPageGroup(0); // 필터 변경 시 페이지 그룹을 첫 그룹으로 설정
  };

  // 필터 초기화 함수
  const handleResetFilter = () => {
    setBaseFilter('');
    setAlcoholFilter('');
    setGlassFilter('');
    setCurrentPage(1); // 필터 초기화 시 페이지를 첫 페이지로 설정
    setPageGroup(0); // 필터 초기화 시 페이지 그룹을 첫 그룹으로 설정
    setSortOption(''); // 정렬 옵션 초기화
  };

  return (
    <BasicLayout>
      <div className="filter-dropdowns">
        <select onChange={handleBaseFilterChange} value={baseFilter}>
          <option value="">베이스</option>
          {uniqueIngredients.map((ingredient, index) => (
            <option key={index} value={ingredient}>{ingredient}</option>
          ))}
        </select>
        <select onChange={handleGlassFilterChange} value={glassFilter}>
          <option value="">글래스</option>
          {uniqueGlasses.map((glass, index) => (
            <option key={index} value={glass}>{glass}</option>
          ))}
        </select>
        <select onChange={handleAlcoholFilterChange} value={alcoholFilter}>
          <option value="">알콜 여부</option>
          <option value="Alcoholic">알콜</option>
          <option value="Non alcoholic">논알콜</option>
        </select>
        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="">정렬 기준</option>
          <option value="recommendation">추천수</option>
          <option value="views">조회수</option>
        </select>
        <button onClick={handleResetFilter} className="btn-hover" style={{ margin: "2px", marginLeft: "20px", padding: "0px 20px 0px", height: "39px" }}>Reset</button>
        <div className="my-cocktail-link">
          <Link to="/mycocktail">My Cocktail</Link>
        </div>
      </div>
      <div className="container" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {currentItems.map(cocktail => (
          <Link key={cocktail.cocktailId} to={`/customcocktail/${cocktail.cocktailId}`} className="cocktail-link">
            <div className="cocktail-item">
              <div className="image-box">
                <img src={cocktail.imageUrl || 'default-image-url.jpg'} alt={cocktail.name} className="cocktail-image" style={{ height: "208px" }} />
              </div>
              <h2 className="cocktail-name">{cocktail.name}</h2>
              <h2 className="cocktail-eye"><IoEyeSharp /> {cocktail.view}👍{cocktail.recommend}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageGroupChange('prev')}
          disabled={pageGroup === 0}
        >
          {'<'}
        </button>
        {Array.from({ length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) }, (_, index) => {
          const pageNumber = pageGroup * pagesPerGroup + index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => handlePageGroupChange('next')}
          disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
        >
          {'>'}
        </button>
      </div>
    </BasicLayout>
  );
}

export default CustomCocktail;