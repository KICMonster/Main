import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicLayout from '../../layouts/BasicLayout';
import Loading from '../../pages/Loading';

function AnalysisComplete() {
  const location = useLocation();
  const { recommendedCocktails } = location.state || { recommendedCocktails: [] };
  const [currentCocktail, setCurrentCocktail] = useState(null);

  const selectRandomCocktail = () => {
    if (recommendedCocktails.length > 0) {
      const randomIndex = Math.floor(Math.random() * recommendedCocktails.length);
      setCurrentCocktail(recommendedCocktails[randomIndex]);
    }
  };

  useEffect(() => {
    selectRandomCocktail();
  }, [recommendedCocktails]);

  if (!currentCocktail) {
    return (
      <BasicLayout>
        <div><Loading /></div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div style={styles.container}>
        <div key={currentCocktail.id} style={styles.cocktailContainer}>
          <div style={styles.imageContainer}>
            <img src={currentCocktail.imageUrl} alt={currentCocktail.name} style={styles.cocktailImage} />
          </div>
          <div style={styles.textContainer}>
            <h1 style={styles.cocktailDescription}>회원님에게 알맞는 칵테일은 <strong>{currentCocktail.name}</strong> 입니다!</h1>
            <div style={styles.ingredientsContainer}>
              <p style={styles.description}>재료1: {currentCocktail.ingredient1}</p>
              <p style={styles.description}>재료2: {currentCocktail.ingredient2}</p>
              <p style={styles.description}>재료3: {currentCocktail.ingredient3}</p>
              <p style={styles.description}>Description: {currentCocktail.description}</p>
            </div>
          </div>
        </div>
        <button onClick={selectRandomCocktail} style={styles.button}>다른 칵테일 보기</button>
      </div>
    </BasicLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  textContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  cocktailDescription: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  ingredientsContainer: {
    fontSize: "16px",
  },
  description: {
    margin: "4px 0",
  },
  imageContainer: {
    position: "relative",
    width: "400px",
    height: "400px",
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cocktailImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "#0056b3",
    },
  },
};

export default AnalysisComplete;