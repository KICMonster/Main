import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './styles/SearchBar.css';

function    SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("검색어:", searchQuery);
        setSearchQuery("")
    };


    return (
        <div className="SerchC">
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
