import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './styles/SearchBar.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim().length >= 2) {
            navigate(`/search/${searchQuery}`);
            setSearchQuery("");
        } else {
            alert("최소 2글자를 사용해주세요!");
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
