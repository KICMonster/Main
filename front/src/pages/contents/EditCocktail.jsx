import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/mycocktail.css';
import { useNavigate, useParams } from "react-router-dom";  // 확인해야 할 부분
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

function EditCocktail() {
  const { cocktailId } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAlcoholic, setIsAlcoholic] = useState("");
  const [glassType, setGlassType] = useState("");
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "", volume: "" },
    { id: 2, name: "", amount: "", volume: "" },
    { id: 3, name: "", amount: "", volume: "" },
    { id: 4, name: "", amount: "", volume: "" },
    { id: 5, name: "", amount: "", volume: "" }
  ]);

  const [error, setError] = useState(null);
  const placeholders = ["베이스", "재료 1", "재료 2", "재료 3", "재료 4"];

  useEffect(() => {
    const fetchCocktailDetail = async () => {
      try {
        const cocktailEndpoint = `/custom/${cocktailId}`;
        const token = localStorage.getItem('jwt') || '';
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const cocktailResponse = await axiosInstance.get(cocktailEndpoint, { headers });
        const data = cocktailResponse.data;

        setTitle(data.customNm);
        setDescription(data.customRcp);
        setIsAlcoholic(data.alcoholic);
        setGlassType(data.glass);
        setPreviewUrl(data.customImageUrl);

        const ingredientsArray = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientName = data[`customIngredient${i}`];
          const ingredientMeasure = data[`customMeasure${i}`];
          if (ingredientName && ingredientMeasure) {
            ingredientsArray.push({
              id: i,
              name: ingredientName,
              amount: ingredientMeasure
            });
          }
        }
        setIngredients(ingredientsArray);

      } catch (error) {
        console.error('Error fetching cocktail detail:', error);
        setError(error.message);
      }
    };

    fetchCocktailDetail();
  }, [cocktailId]);

  const handleInputChange = (id, field, value) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };
 

  const addIngredient = () => {
    if (ingredients.length < 15) {
      const newId = ingredients.length + 1;
      setIngredients(prevIngredients => {
        const hasEmptyOrNullValues = prevIngredients.some(ingredient => !ingredient.name || !ingredient.amount);
        if (hasEmptyOrNullValues) {
          alert("빈 재료들을 채워주세요!");
          return prevIngredients;
        }
        return [
          ...prevIngredients,
          { id: newId, name: "", amount: "", volume: "" }
        ];
      });
    } else {
      alert("최대 15개까지만 추가할 수 있습니다.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ingredients.every(ingredient => !ingredient.name.trim() || !ingredient.amount.trim())) {
      alert("최소 4개의 재료의 이름과 양을 입력하세요.");
      return;
    }

    if (!title || !description || !selectedFile) {
      alert("입력 필드를 모두 채워주세요.");
      return;
    }

    try {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.name.trim() !== "" && ingredient.amount.trim() !== "");
  
        const formData = new FormData();
        formData.append('name', title);
        if (selectedFile) {
          formData.append('image', selectedFile);
        }
        formData.append('description', description);
        filteredIngredients.forEach((ingredient, index) => {
          formData.append(`ingredient${index + 1}`, ingredient.name);
          formData.append(`measure${index + 1}`, ingredient.amount);
        });
        formData.append('alcoholic', isAlcoholic);
        formData.append('glass', glassType);
 
        const response = await axiosInstance.put(`/custom/${cocktailId}`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
          });
    
          if (response.status === 200 && response.data) {
            alert('칵테일이 성공적으로 수정되었습니다.');
            navigate(`/customcocktail/${cocktailId}`);
          } else {
            throw new Error('서버 에러');
          }
        } catch (error) {
          alert('칵테일 수정 중 에러 발생: ' + error.message);
        }
      };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      alert("파일 크기는 5MB 이하만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("jpg, png, gif 확장자만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }
    
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleMaxLengthAlert = (length, maxLength) => {
    if (length === maxLength) {
      alert(`최대 ${maxLength}자까지 입력할 수 있습니다.`);
    }
  };

  const handleVolumeChange = (id, value) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, volume: value } : ingredient
      )
    );
  };

  

  return (
    <BasicLayout>
      <div className="MyBoard">
        <div className="MyContainer">
          <div className="MyRight">
            <form onSubmit={handleSubmit} className="MyForm">
              <div className="MyFormGroup">
                <h1>수정하기</h1>
                <label className="MyLabel">이름</label>
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
                <label className="MyLabel">레시피</label>
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
                {previewUrl && <img src={previewUrl} alt="미리보기" className="MyImagePreview" />}
                <input type="file" className="MyFileInput" onChange={handleFileChange} />
              </div>
              <div className="MyButtonGroup">
                <button type="submit" className="MySubmitButton">
                  수정
                </button>
                <button type="button" className="MyCancelButton" onClick={() => navigate(-1)}>
                  취소
                </button>
              </div>
              {error && <p className="MyError">{error}</p>}
            </form>
          </div>
          <div className="MyLeft">
            <div className="MyIngredientSection">
              <h2>추가하실 재료</h2>
              <button type="button" onClick={addIngredient} className="MyAddButton">
                재료 추가하기
              </button>
              <div className="MySelectContainer">
                <select
                  value={isAlcoholic}
                  onChange={(e) => setIsAlcoholic(e.target.value)}
                  className="MySelect"
                >
                  <option value="" disabled>알콜 여부 선택</option>
                  <option value="알콜">알콜</option>
                  <option value="논알콜">논알콜</option>
                </select>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="MySelect"
                >
                  <option value="" disabled>유리잔 선택</option>
                  <option value="하이볼">하이볼</option>
                  <option value="칵테일 글래스">칵테일 글래스</option>
                  <option value="샷 글래스">샷 글래스</option>
                  <option value="와인 글래스">와인 글래스</option>
                  <option value="맥주 글래스">맥주 글래스</option>
                  <option value="기타">기타</option>
                </select>
              </div>
              <div className="MyIngredientsContainer">
                {ingredients.map((ingredient, index) => (
                  <div key={ingredient.id} className="MyFormGroup">
                    <div className="MyIngredientRow">
                      <input
                        type="text"
                        placeholder={placeholders[index] ? `${placeholders[index]}` : `재료 ${ingredient.id}`}
                        value={ingredient.name}
                        onChange={(e) =>
                          handleInputChange(ingredient.id, "name", e.target.value)
                        }
                        onFocus={(e) => e.target.placeholder = ''}
                        onBlur={(e) => e.target.placeholder = placeholders[index] ? `${placeholders[index]}` : `재료 ${ingredient.id}`}
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
                      <div>
                        <select
                          value={ingredient.volume}
                          onChange={(e) => handleVolumeChange(ingredient.id, e.target.value)}
                          className="MyVolumeDropdown"
                        >
                          <option value="" disabled>단위 선택</option>
                          <option value="L">리터</option>
                          <option value="ounce">온스</option>
                          <option value="Dash">대시</option>
                          <option value="ts">티스푼</option>
                          <option value="Drop">드롭</option>
                          <option value="Ts">테이블 스푼</option>
                          <option value="finger">핑거</option>          
                          <option value="Cup">컵</option>
                          <option value="Pint">핀트</option>
                          <option value="Quart">쿼트</option>
                          <option value="Gallon">겔론</option>
                          <option value="Magnum">메그넘</option>
            
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
}

export default EditCocktail;