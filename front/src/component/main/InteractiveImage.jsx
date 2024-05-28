import React, { useState } from 'react';
import styles from './styles/InteractiveImage.module.css';
import cocktailImage1 from '../../img/ddd.png';
import cocktailImage2 from '../../img/sss.jpg';
import cocktailImage3 from '../../img/aaa.jpg';
import CraftList from '../list/CraftList';
import { Link } from 'react-router-dom';
import HistoryPage from '../../pages/information/HistoryPage';

const linksList = [
  [<Link to="/history" key="history"><HistoryPage /></Link>],
  [<CraftList key="craft"/>],
  [
    { title: "뉴스기사 1번 페이지 입니다 (미구현)", url: '#' },
    { title: "뉴스기사 2번 페이지 입니다 (미구현)", url: '#' },
    { title: "뉴스기사 3번 페이지 입니다 (미구현)", url: '#' },
    { title: "뉴스기사 4번 페이지 입니다 (미구현)", url: '#' },
    { title: "뉴스기사 5번 페이지 입니다 (미구현)", url: '#' }
    
  ]
];

const InteractiveImage = () => {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setVisibleIndex(index);
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setVisibleIndex(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {[cocktailImage1, cocktailImage2, cocktailImage3].map((image, index) => (
          <div
            key={index}
            className={styles.imageSection}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div
        className={styles.listContainer}
        onMouseEnter={() => handleMouseEnter(visibleIndex)}
        onMouseLeave={handleMouseLeave}
      >
        {visibleIndex !== null && (
          <div className={styles.contentSection}>
            {linksList[visibleIndex].map((link, linkIndex) => {
              if (typeof link === 'object' && link.title && link.url !== '') {
                return (
                  <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {link.title}
                  </a>
                );
              } else {
                return <div key={linkIndex}>{link}</div>;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveImage;