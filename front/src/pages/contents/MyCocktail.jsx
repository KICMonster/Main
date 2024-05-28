import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";

function MyCocktail() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "" },
    { id: 2, name: "", amount: "" },
    { id: 3, name: "", amount: "" },
    { id: 4, name: "", amount: "" },
    { id: 5, name: "", amount: "" }
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
    const newId = ingredients.length + 1;
    setIngredients(prevIngredients => [
      ...prevIngredients,
      { id: newId, name: "", amount: "" }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit logic here
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <BasicLayout>
      <div style={styles.board}>
        <div style={styles.container}>  
          <div style={styles.left}>
            <div style={styles.ingredientSection}>
              <h2>추가하실 재료</h2>
              <button type="button" onClick={addIngredient} style={styles.addButton}>
                재료 추가하기
              </button>
              <div style={styles.ingredientsContainer}>
                {ingredients.map(ingredient => (
                  <div key={ingredient.id} style={styles.formGroup}>
                    <div style={styles.ingredientRow}>
                      <input
                        type="text"
                        placeholder={`재료 ${ingredient.id} 이름`}
                        value={ingredient.name}
                        onChange={(e) =>
                          handleInputChange(ingredient.id, "name", e.target.value)
                        }
                        style={styles.ingredientInput}
                      />
                      <input
                        type="text"
                        placeholder="재료의 양"
                        value={ingredient.amount}
                        onChange={(e) =>
                          handleInputChange(ingredient.id, "amount", e.target.value)
                        }
                        style={styles.amountInput}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={styles.right}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>제목을 입력해주세요</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>내용</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={styles.textarea}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>이미지 첨부</label>
                <input type="file" style={styles.fileInput} />
              </div>
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  등록
                </button>
                <button type="button" style={styles.cancelButton}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

const styles = {
  board: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 흰색 반투명 배경
    padding: "20px",
    borderRadius: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    marginTop: "125px", // 보드를 아래로 내리는 위치 조정
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 보드에 그림자 추가
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  left: {
    marginRight: "20px",
    flex: "1",
  },
  right: {
    flex: "2",
  },
  ingredientSection: {
    padding: "20px",
    borderRight: "1px solid #ccc",
    maxHeight: "500px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ingredientsContainer: {
    marginBottom: "20px",
    width: "100%",
  },
  ingredientRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    width: "100%",
  },
  ingredientInput: {
    flex: "1",
    padding: "8px",
    marginBottom: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
  },
  amountInput: {
    flex: "1",
    marginLeft: "10px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
    width: "100%",
  },
  label: {
    fontSize: "16px",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  fileInput: {
    width: "100%",
    padding: "8px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  submitButton: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default MyCocktail;