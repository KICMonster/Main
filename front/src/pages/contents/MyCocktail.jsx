import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/mycocktail.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function MyCocktail() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    // JWT 토큰 확인
    if (!jwtToken) {
      alert("로그인 후 사용해주세요");
      navigate("/login"); // navigate 사용
    }
  }, [navigate]);

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
      setIngredients(prevIngredients => {
        const hasEmptyOrNullValues = prevIngredients.some(ingredient => !ingredient.name || !ingredient.amount);
        if (hasEmptyOrNullValues) {
          alert("빈 재료들을 채워주세요!");
          return prevIngredients;
        }
        return [
          ...prevIngredients,
          { id: newId, name: "", amount: "" }
        ];
      });
    } else {
      alert("최대 10개까지만 추가할 수 있습니다.");
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

      console.log("제목:", title, "내용:", description, "재료:", filteredIngredients, "알콜 여부:", isAlcoholic, "유리잔 타입:", glassType, "로 폼을 제출합니다.");
      alert("등록되었습니다.");
    } catch (error) {
      console.error("오류 발생:", error);
      setError(error.message);
    }
    if (selectedFile) {
      const filteredIngredients = ingredients.filter(ingredient => ingredient.name.trim() !== "" && ingredient.amount.trim() !== "");
      const formData = new FormData();
      formData.append('name', title);
      formData.append('image', selectedFile);
      formData.append('description', description);
      filteredIngredients.forEach((ingredient, index) => {
        formData.append(`ingredient${index + 1}`, ingredient.name);
        formData.append(`measure${index + 1}`, ingredient.amount);
      });
      formData.append('alcoholic', isAlcoholic);
      formData.append('glass', glassType);
 
      try {
        const response = await axios.post('https://luvcocktail.site/api/custom', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });

        if (response.status === 200 && response.data) {
          alert('칵테일이 성공적으로 등록되었습니다.');
          navigate(`/customcocktail/${response.data.cocktailId}`);
        } else {
          throw new Error('서버 에러');
        }
      } catch (error) {
        alert('사진 업로드 중 에러 발생: ' + error.message);
      }
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
                <h1>나만의 칵테일</h1>
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
                <button type="submit" className="MySubmitButton" >
                  등록
                </button>
                <button type="button" className="MyCancelButton">
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
                  <option value="" selected disabled>알콜 여부 선택</option>
                  <option value="알콜">알콜</option>
                  <option value="논알콜">논알콜</option>
                </select>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="MySelect"
                >
                  <option value="" selected disabled>유리잔 선택</option>
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
                          <option value="" selected disabled>단위 선택</option>
                          <option value="ounce">온스</option>
                          <option value="Dash">대시</option>
                          <option value="ts">티스푼</option>
                          <option value="Jigger">지거</option>
                          <option value="Drop">드롭</option>
                          <option value="Ts">테이블 스푼</option>
                          <option value="pony">포니</option>
                          <option value="finger">핑거</option>
                          <option value="Gill">길</option>
                          <option value="Split">스플리트</option>
                          <option value="Cup">컵</option>
                          <option value="Pint">핀트</option>
                          <option value="Fifth">핍스</option>
                          <option value="Quart">쿼트</option>
                          <option value="Gallon">겔론</option>
                          <option value="Magnum">메그넘</option>
                          <option value="Jeroboam">제로보움</option>
                          <option value="합">합</option>
                          <option value="승">승</option>
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

export default MyCocktail;
