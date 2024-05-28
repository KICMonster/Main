import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function RecommendCocktail() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(null);

  const fetchCocktailDetail = async () => {
    try {
      const cocktailEndpoint = "https://localhost:9092/api/cocktail";
      const cocktailResponse = await fetch(cocktailEndpoint);
      const cocktailsData = await cocktailResponse.json();
      const firstCocktail = cocktailsData[0]; // 첫 번째 칵테일 정보 가져오기
      setCocktail(firstCocktail);
    } catch (error) {
      console.error('Error fetching cocktail detail:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchCocktailDetail();
  }, [cocktailId]);

  if (error) {
    return (
      <BasicLayout>
        <div>Error: {error}</div>
      </BasicLayout>
    );
  }

  if (!cocktail) {
    return (
      <BasicLayout>
        <div>Loading...</div>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <h1 style={styles.cocktailDescription}>회원님에게 알맞는 칵테일은 <strong>{cocktail?.name}</strong> 입니다!</h1>
        </div>
        <div style={styles.imageContainer}>
          <img src={cocktail?.recommend} alt={cocktail?.name} style={styles.cocktailImage} />
        </div>
        <div style={styles.buttonContainer}>
          <Link to={`/cocktail/${cocktailId}`} style={styles.button}>상세정보 페이지</Link>
        </div>
        <div style={styles.cocktailNameContainer}>
          <p style={styles.cocktailName}>{cocktail?.name}</p>
        </div>
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
    fontSize: "16px",
    margin: 0,
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
  buttonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
    ":hover": {  // 수정된 부분
      backgroundColor: "#0056b3",
    },
  },
  cocktailNameContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  cocktailName: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
};

export default RecommendCocktail;
