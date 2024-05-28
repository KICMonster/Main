import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";
import "../../pages/cocktail/ViewPage.css"; // CSS 파일을 import

function ViewPage() {
  const [cocktails, setCocktails] = useState([]);
  const [baseFilter, setBaseFilter] = useState('');
  const [alcoholFilter, setAlcoholFilter] = useState('');
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹 상태 추가
  const itemsPerPage = 10;

  const fetchAllCocktails = async () => {
    try {
      const endpoint = 'https://localhost:9092/api/cocktail';                  
      const response = await fetch(endpoint);
      const data = await response.json();
      setCocktails(data);

      // 모든 고유한 리큐르 추출
      const uniqueIngredients = [...new Set(data.map(cocktail => cocktail.ingredient1))];
      setUniqueIngredients(uniqueIngredients);
    } catch (error) {
      console.error('Error fetching cocktails:', error);
    }
  };

  useEffect(() => {
    fetchAllCocktails();
  }, []);

  // 필터링된 칵테일 목록을 계산
  const filteredCocktails = cocktails.filter(cocktail => {
    const baseMatch = baseFilter === '' || cocktail.ingredient1 === baseFilter;
    const alcoholMatch = alcoholFilter === '' || (alcoholFilter === 'Yes' && cocktail.alcoholic === 'Yes') || (alcoholFilter === 'No' && cocktail.alcoholic === 'No');
    return baseMatch && alcoholMatch;
  });

  // 현재 페이지에 해당하는 칵테일 목록 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCocktails.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredCocktails.length / itemsPerPage);
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

  // 필터 초기화 함수
  const handleResetFilter = () => {
    setBaseFilter('');
    setAlcoholFilter('');
    setCurrentPage(1); // 필터 초기화 시 페이지를 첫 페이지로 설정
    setPageGroup(0); // 필터 초기화 시 페이지 그룹을 첫 그룹으로 설정
  };

  return (
    <BasicLayout>
      <div className="filter-dropdowns">
        <select onChange={handleBaseFilterChange} value={baseFilter}>
          <option value="">리큐르</option>
          {uniqueIngredients.map((ingredient, index) => (
            <option key={index} value={ingredient}>{ingredient}</option>
          ))}
        </select>
        <select onChange={handleAlcoholFilterChange} value={alcoholFilter}>
          <option value="">알코올 여부</option>
          <option value="Yes">알코올</option>
          <option value="No">논알코올</option>
        </select>
        <button onClick={handleResetFilter}>Reset Filter</button>
      </div>
      <div className="container" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        {currentItems.map(cocktail => (
          <Link key={cocktail.id} to={`/cocktail/${cocktail.id}`} className="cocktail-link">
            <div className="cocktail-item">
              <div className="image-box">
                <img src={cocktail.imageUrl || 'default-image-url.jpg'} alt={cocktail.name} className="cocktail-image" style={{ width: "100%", height: "auto" }} />
              </div>
              <h2 className="cocktail-name">{cocktail.name}</h2>
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

export default ViewPage;