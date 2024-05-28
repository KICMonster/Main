import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './TrendNews.css';
import BasicLayout from '../../layouts/BasicLayout';

const API_KEY = import.meta.env.VITE_GOOOLE_API_KEY;
const SEARCH_ENGINE_ID = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;
const query = '칵테일 트렌드';

function TrendNews() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const numPerPage = 3;
    const totalResults = 100;
    const sliderInterval = useRef(null); // Slider interval reference

    useEffect(() => {
        const cachedNewsData = localStorage.getItem(`newsData_${currentPage}`);
        const cachedTimestamp = localStorage.getItem(`newsDataTimestamp_${currentPage}`);
        const now = new Date().getTime();

        if (cachedNewsData && cachedTimestamp && (now - cachedTimestamp < 24 * 60 * 60 * 1000)) {
            setArticles(JSON.parse(cachedNewsData));
        } else {
            fetchNews(currentPage);
        }
    }, [currentPage]);

    useEffect(() => {
        // Start slider interval when component mounts
        startSliderInterval();
        // Cleanup interval when component unmounts
        return () => clearInterval(sliderInterval.current);
    }, [currentPage]);

    const fetchNews = async (page) => {
        const startIndex = (page - 1) * numPerPage + 1;
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${SEARCH_ENGINE_ID}&key=${API_KEY}&num=${numPerPage}&start=${startIndex}&sort=date`;

        try {
            const response = await axios.get(url);
            const newArticles = response.data.items.map(item => ({
                title: item.title,
                snippet: item.snippet,
                link: item.link,
                image: item.pagemap?.cse_image?.[0]?.src
            }));

            setArticles(newArticles);
            localStorage.setItem(`newsData_${page}`, JSON.stringify(newArticles));
            localStorage.setItem(`newsDataTimestamp_${page}`, new Date().getTime());
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(totalResults / numPerPage)));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const startSliderInterval = () => {
        // Clear previous interval
        clearInterval(sliderInterval.current);
        // Set new interval
        sliderInterval.current = setInterval(() => {
            setCurrentPage(prevPage => (prevPage === Math.ceil(totalResults / numPerPage)) ? 1 : prevPage + 1);
        }, 5000); // Interval time: 5 seconds
    };

    const stopSliderInterval = () => {
        clearInterval(sliderInterval.current);
    };

    return (
        <BasicLayout>
            <div className="main-container">
                <div className="content">
                    <div className='linkmain' onMouseEnter={stopSliderInterval} onMouseLeave={startSliderInterval}>
                        <button style={{ marginRight: '30px' }} onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <div>
                            <h1>Cocktail News</h1>
                            {articles.map((article, index) => (
                                <div className="article-container" key={index}>
                                    {article.image && <img src={article.image} alt={article.title} />}
                                    <div className="article-content">
                                        <h2>{article.title}</h2>
                                        <p>{article.snippet}</p>
                                        <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button style={{ marginLeft: '30px' }} onClick={handleNextPage} disabled={currentPage === Math.ceil(totalResults / numPerPage)}>Next</button>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default TrendNews;