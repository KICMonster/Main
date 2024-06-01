import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/mycocktail.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function MyCocktail() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwt");
  //   // JWT 토큰 확인
  //   if (!jwtToken) {
  //     alert("로그인 후 사용해주세요");
  //     navigate("/login"); // navigate 사용
  //   }
  // }, [navigate]);

  // 상태 변수들 선언 및 초기화
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(""); // 제목 상태
  const [description, setDescription] = useState(""); // 설명 상태
  const [isAlcoholic, setIsAlcoholic] = useState(""); // 알콜 여부 상태
  const [glassType, setGlassType] = useState(""); // 유리잔 타입 상태
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "", amount: "", volume: "" },
    { id: 2, name: "", amount: "", volume: "" },
    { id: 3, name: "", amount: "", volume: "" },
    { id: 4, name: "", amount: "", volume: "" },
    { id: 5, name: "", amount: "", volume: "" }
  ]);
   
  const [error, setError] = useState(null);
  const placeholders = ["베이스", "재료 1", "재료 2", "재료 3", "재료 4"]; // 재료 플레이스홀더

  const handleInputChange = (id, field, value) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  // 재료 추가 함수
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

    // 재료 유효성 검사 및 값 변경 여부 확인
    if (ingredients.every(ingredient => !ingredient.name.trim() || !ingredient.amount.trim())) {
      alert("최소 4개의 재료의 이름과 양을 입력하세요.");
      return;
    }

    // 입력 필드 유효성 검사 : 제목, 설명, 이미지
    if (!title || !description || !selectedFile) {
      alert("입력 필드를 모두 채워주세요.");
      return;
    }


    try {
      // 빈 값이나 널 값이 포함된 요소를 제거
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
      formData.append('image', selectedFile);  // 파일 데이터를 formData에 추가
      formData.append('description', description);
      filteredIngredients.forEach((ingredient, index) => {
        formData.append(`ingredient${index + 1}`, ingredient.name);
        formData.append(`measure${index + 1}`, ingredient.amount);
      });
      formData.append('alcoholic', isAlcoholic);
      formData.append('glass', glassType);
 
      try {
        const response = await axios.post('https://localhost:9092/api/custom', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });

        if (response.status === 200 && response.data) {
          alert('칵테일이 성공적으로 등록되었습니다.');
          // 여기에서 응답으로 받은 cocktailId를 사용하여 페이지 이동
          navigate(`/customcocktail/${response.data.cocktailId}`);
        } else {
          throw new Error('서버 에러');
        }
      } catch (error) {
        alert('사진 업로드 중 에러 발생: ' + error.message);
      }
    }
  };



 /////////////////////////// // 제출이 끝나는 위치/////////////////////////






  // 파일 선택 시 실행되는 함수
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // 파일이 선택되지 않은 경우 처리
    if (!file) return;

    // 파일 크기 체크
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > 5) {
      alert("파일 크기는 5MB 이하만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    // 허용되는 확장자 목록 확인
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    // 파일 확장자 확인
    const fileExtension = file.name.split(".").pop().toLowerCase();
    // 허용되지 않는 확장자인 경우 처리
    if (!allowedExtensions.includes(fileExtension)) {
      alert("jpg, png, gif 확장자만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }
    // 파일 상태 업데이트
    setSelectedFile(file);
  };

  // 입력 최대 길이에 도달 시 알림 표시
  const handleMaxLengthAlert = (length, maxLength) => {
    if (length === maxLength) {
      alert(`최대 ${maxLength}자까지 입력할 수 있습니다.`);
    }
  };

  // 볼륨 변경 핸들러
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
                  <option value="">알콜 여부 선택</option>
                  <option value="알콜">알콜</option>
                  <option value="논알콜">논알콜</option>
                </select>
                <select
                  value={glassType}
                  onChange={(e) => setGlassType(e.target.value)}
                  className="MySelect"
                >
                  <option value="">유리잔 선택</option>
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
                          <option value="">단위 선택</option>
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
        </div>
      </div>
    </BasicLayout>
  );
}

export default MyCocktail;