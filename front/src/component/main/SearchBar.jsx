import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // useNavigate로 변경
import './styles/SearchBar.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // useNavigate 사용

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search/${searchQuery}`); // 검색어를 URL 파라미터로 포함하여 이동
            setSearchQuery("");
        }
    };

    return (
        <div className="SearchC">
            <FaSearch onClick={handleSubmit} className="search-icon" />
            <div className="search-form-container">
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Search"
                        className="search-input"
                    />
                </form>
            </div>
        </div>
    );
}

export default SearchBar;