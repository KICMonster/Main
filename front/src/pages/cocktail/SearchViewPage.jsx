import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BasicLayout from "../../layouts/BasicLayout";
import { Link } from "react-router-dom";
import "../../component/main/styles/ViewPage.css";
import "../../component/main/styles/CocktailDetail.css";


// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

function SearchViewPage() {
  const { name } = useParams();
  const [cocktails, setCocktails] = useState([]);
  const [baseFilter, setBaseFilter] = useState('');
  const [alcoholFilter, setAlcoholFilter] = useState('');
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // 페이지 그룹 상태 추가
  const itemsPerPage = 10;
 
useEffect(() => {
    console.log("현재 검색어:", name);  // 이 로그를 통해 현재 검색어가 무엇인지 확인할 수 있습니다.
    const fetchCocktails = async () => {
      if (name) {
        const encodedQuery = encodeURIComponent(name); // 검색어 인코딩
        try {
            const endpoint = `/search/?name=${encodedQuery}`;
            const response = await axiosInstance.get(endpoint);
            const data = response.data;
            setCocktails(data);
            const uniqueIngredients = [...new Set(data.map(cocktail => cocktail.ingredient1))];
            setUniqueIngredients(uniqueIngredients);
        } catch (error) {
          console.error('Error fetching cocktails:', error);
        }
      }
    };
  
    fetchCocktails();
  }, [name]);


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
       <button onClick={handleResetFilter} className="btn-hover" style={{margin:"2px", marginLeft:"20px", padding:"0px 20px 0px", height: "39px"}}>Reset</button>
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
export default SearchViewPage;