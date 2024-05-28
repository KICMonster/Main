import React from 'react';
import TodayCocktail from '../../img/Cocktail_02.jpg';
import Taste from '../../img/logo.png';
import Health from '../../img/health.jpg';
import Bar from '../../img/make.jpg';

// 페이지 하단 4개 이미지
const links = [
    { name: '오늘의 칵테일', imageUrl: TodayCocktail, link: '/#' },
    { name: '회원님의 취향 저격', imageUrl: Taste, link: '/#' },
    { name: '건강한 음주', imageUrl: Health, link: '/#' },
    { name: '주변 바 추천받기', imageUrl: Bar, link: '/#' }
];

const CocktailLink = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', maxWidth: '800px', margin: 'auto' }}>
            {links.map((link, index) => (
                <div key={index} style={{ flex: '1 0 50%', maxWidth: '50%', cursor: 'pointer', boxSizing: 'border-box', padding: '10px', textAlign: 'center' }}>
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                        <img src={link.imageUrl} alt={link.name} style={{ width: '100%', height: 'auto' }} />
                    </a>
                    <p style={{ margin: '5px 0', fontSize: '14px', fontWeight: 'bold' }}>{link.name}</p>
                </div>
            ))}
        </div>
    );
};

export default CocktailLink;
