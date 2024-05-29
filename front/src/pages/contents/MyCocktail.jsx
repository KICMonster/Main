import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/mycocktail.css';

function MyCocktail() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "" },
    { id: 2, name: "", amount: "" },
    { id: 3, name: "", amount: "" },
    { id: 4, name: "", amount: "" },
    { id: 4, name: "", amount: "" }
  ]);
  const [error, setError] = useState(null);

  const handleInputChange = (id, field, value) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const addIngredient = () => {
    if (ingredients.length < 10) {
      const newId = ingredients.length + 1;
      setIngredients(prevIngredients => [
        ...prevIngredients,
        { id: newId, name: "", amount: "" }
      ]);
    } else {
      alert("최대 10개까지만 추가할 수 있습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    // 모든 입력 필드 값이 없는지 확인
    if (!title || !description || ingredients.some(ingredient => !ingredient.name || !ingredient.amount)) {
      alert("입력 필드를 모두 채워주세요.");
      return;
    }

    try {
      console.log("제목:", title, "내용:", description, "재료:", ingredients, "로 폼을 제출합니다.");
      // 제출 로직 구현
      alert("등록되었습니다.");
    } catch (error) {
      console.error("오류 발생:", error);
      setError(error.message);
    }
  };

  const validateForm = () => {
    // Validation logic here
    return true;
  };

  const handleFileChange = (e) => {
    // File handling logic here
  };

  // 재료의 양과 제목 란 중 하나라도 작성되어 있으면 등록 버튼 활성화
  const isFormValid = title !== "" || ingredients.some(ingredient => ingredient.amount !== "");

  // 최대 길이에 도달하면 알림 표시
  const handleMaxLengthAlert = (length, maxLength) => {
    if (length === maxLength) {
      alert(`최대 ${maxLength}자까지 입력할 수 있습니다.`);
    }
  };

  return (
    <BasicLayout>
      <div className="MyBoard">
        <div className="MyContainer">
          <div className="MyLeft">
            <div className="MyIngredientSection">
              <h2>추가하실 재료</h2>
              <button type="button" onClick={addIngredient} className="MyAddButton">
                재료 추가하기
              </button>
              <div className="MyIngredientsContainer">
                {ingredients.map(ingredient => (
                  <div key={ingredient.id} className="MyFormGroup">
                    <div className="MyIngredientRow">
                      <input
                        type="text"
                        placeholder={`재료 ${ingredient.id} 이름`}
                        value={ingredient.name}
                        onChange={(e) =>
                          handleInputChange(ingredient.id, "name", e.target.value)
                        }
                        className="MyIngredientInput"
                        maxLength="15"
                        onKeyUp={() => handleMaxLengthAlert(ingredient.name.length, 15)}
                      />
                      <input
                        type="text"
                        placeholder="재료의 양"
                        value={ingredient.amount}
                        onChange={(e) =>
                          handleInputChange(ingredient.id, "amount", e.target.value)
                        }
                        className="MyAmountInput"
                        maxLength="15"
                        onKeyUp={() => handleMaxLengthAlert(ingredient.amount.length, 15)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="MyRight">
            <form onSubmit={handleSubmit} className="MyForm">
              <div className="MyFormGroup">
                <label className="MyLabel">제목을 입력해주세요</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="MyInput"
                  maxLength="15"
                  onKeyUp={() => handleMaxLengthAlert(title.length, 15)}
                />
              </div>
              <div className="MyFormGroup">
                <label className="MyLabel">내용</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="MyTextarea"
                  maxLength="500"
                  onKeyUp={() => handleMaxLengthAlert(description.length, 500)}
                />
              </div>
              <div className="MyFormGroup">
                <label className="MyLabel">이미지 첨부</label>
                <input type="file" className="MyFileInput" onChange={handleFileChange} />
              </div>
              <div className="MyButtonGroup">
                <button type="submit" className="MySubmitButton" disabled={!isFormValid}>
                  등록
                </button>
                <button type="button" className="MyCancelButton">
                  취소
                </button>
              </div>
              {error && <p className="MyError">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default MyCocktail;