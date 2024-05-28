import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";

function IngredientPage() {
  // 임의의 재료 데이터
  const [ingredients, setIngredients] = useState([]);

  // 재료 데이터를 불러와서 상태에 설정하는 함수
  const fetchAllIngredients = () => {
    // 여기에 재료 데이터를 불러오는 로직을 작성하세요
    // 예를 들어 fetch나 axios 등을 사용하여 API를 호출하여 데이터를 가져올 수 있습니다.
    // 이 예시에서는 더미 데이터를 사용합니다.
    const dummyIngredients = [
      { id: 1, name: "우유", description: "달콤한 맛이 나는 유제품", image: "milk.jpg" },
      { id: 2, name: "커피", description: "쌉싸름한 맛과 향이 나는 음료", image: "coffee.jpg" },
      { id: 3, name: "설탕", description: "달콤한 맛을 내는 감미료", image: "sugar.jpg" },
      { id: 4, name: "밀가루", description: "빵, 과자 등의 제조에 사용되는 가루", image: "flour.jpg" },
      { id: 5, name: "버터", description: "부드럽고 질감이 풍부한 유지류", image: "butter.jpg" }
    ];

    // 재료 상태 업데이트
    setIngredients(dummyIngredients);
  };

  useEffect(() => {
    fetchAllIngredients(); // 컴포넌트가 마운트되면 재료 데이터를 불러옴
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <BasicLayout>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h2 style={{ marginBottom: "20px" }}>재료 목록</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {/* 재료 목록 렌더링 */}
          {ingredients.map(ingredient => (
            <div key={ingredient.id} style={{ margin: "10px", textAlign: "center" }}>
              {/* 재료 이미지 */}
              <img src={ingredient.image} alt={ingredient.name} style={{ maxWidth: "150px", marginBottom: "10px" }} />
              {/* 재료 이름 */}
              <h3>{ingredient.name}</h3>
              {/* 재료 설명 */}
              <p>{ingredient.description}</p>
            </div>
          ))}
        </div>
      </div>
    </BasicLayout>
  );
}

export default IngredientPage;
