import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

function CocktailDetail() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState(null);
  const [appetizers, setAppetizers] = useState([]);

  const fetchCocktailDetail = async () => {
    try {
      const cocktailEndpoint = `https://localhost:9092/api/cocktail/${cocktailId}`;
      const appetizersEndpoint = "https://localhost:9092/api/ingredient";

      const cocktailResponse = await fetch(cocktailEndpoint);
      const cocktailData = await cocktailResponse.json();
      setCocktail(cocktailData);

      const appetizersResponse = await fetch(appetizersEndpoint);
      const appetizersData = await appetizersResponse.json();
      // 처음 세 개의 안주만 가져오기
      setAppetizers(appetizersData.slice(0, 3));
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
        <div style={styles.leftColumn}>
          <div style={styles.imageBox}>
            <img src={cocktail.imageUrl} alt={cocktail.name} style={styles.cocktailImage} />
          </div>
        </div>
        <div style={styles.rightColumn}>
          <div style={styles.contentBox}> {/* contentBox 추가 */}
            <h1 style={styles.cocktailName}>{cocktail.name}</h1>
            <hr style={styles.divider} />
            <p style={styles.cocktailDescription}>{cocktail.description}</p>
            <h2 style={styles.sectionTitle}>Ingredients:</h2>
            <ul style={styles.ingredientsList}>
              <li>Vodka: {cocktail.measure1}</li>
              <li>Triple sec: {cocktail.measure2}</li>
              <li>Cranberry juice: {cocktail.measure3}</li>
            </ul>
            <h2 style={styles.sectionTitle}>Instructions:</h2>
            <p style={styles.instructions}>{cocktail.instructions}</p>
            <h2 style={styles.sectionTitle}>Appetizers:</h2>
            <div style={styles.appetizersContainer}>
              {appetizers.map((appetizer, index) => (
                <div key={index} style={styles.appetizerBox}>
                  <img src={appetizer.description || 'default-image-url.jpg'} alt={appetizer.name} style={styles.appetizerImage} />
                  <div>{appetizer.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "50px",
  },
  leftColumn: {
    flex: "1 1 auto",
    marginRight: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "sticky", // 이미지를 고정하는 스타일 추가
    top: "50px", // 이미지의 상단 여백 설정
  },
  rightColumn: {
    flex: "2 1 auto",
    maxWidth: "5500px", // 수정된 부분: 이미지와 내용의 간격을 줄이기 위해 줄임
  },
  imageBox: {
    width: "500px", // 이미지 박스의 가로 크기
    height: "500px", // 이미지 박스의 세로 크기
    overflow: "hidden",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // 그림자 효과 추가
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ddd", // 이미지에 border 추가
  },
  cocktailImage: {
    maxWidth: "100%", // 이미지가 이미지 박스에 가득 차도록 설정
    maxHeight: "100%", // 이미지가 이미지 박스에 가득 차도록 설정
    objectFit: "contain", // 이미지가 자동으로 크기를 맞춤
  },
  contentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 투명한 박스 배경색 설정
    padding: "20px", // 내용을 감싸는 박스 안의 여백 설정
    borderRadius: "10px", // 박스에 둥근 테두리 설정
  },
  cocktailName: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "20px 0",
  },
  cocktailDescription: {
    fontSize: "16px",
    margin: "10px 0",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "30px 0 10px",
  },
  ingredientsList: {
    listStyleType: "none",
    padding: 0,
    margin: "0 0 120px",
  },
  instructions: {
    fontSize: "16px",
    lineHeight: "1.6",
  },
  appetizersContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  appetizerBox: {
    width: "200px",
    textAlign: "center",
    margin: "10px",
  },
  appetizerImage: {
    width: "100%",
    borderRadius: "8px",
  },
  divider: {
    width: "100%", // 선의 너비를 100%로 설정하여 가로 길이에 맞춤
    margin: "20px 0", // 선 위아래 여백 추가
    borderTop: "1px solid #ddd", // 선의 스타일 지정
  },
};

export default CocktailDetail;