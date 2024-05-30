import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/mycocktail.css';
import { useNavigate } from "react-router-dom";

function MyCocktail() {

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    // JWT 토큰 확인
    if (!jwtToken) {
      alert("로그인한 회원만 등록 버튼을 누를 수 있습니다!");
      navigate("/login"); // navigate 사용
    }
  }, [navigate]);


  // 상태 변수들 선언 및 초기화
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState(""); // 제목 상태
  const [description, setDescription] = useState(""); // 설명 상태
  const [ingredients, setIngredients] = useState([ // 재료 상태
    { id: 1, name: "", amount: "", volume: "" },
    { id: 2, name: "", amount: "", volume: "" },
    { id: 3, name: "", amount: "", volume: "" },
    { id: 4, name: "", amount: "", volume: "" },
    { id: 5, name: "", amount: "", volume: "" }
  ]);

  const [error, setError] = useState(null);
  const placeholders = ["베이스", "시럽", "가니쉬", "리큐르", "얼음"]; // 재료 플레이스홀더


  // 입력 필드 값이 변경될 때 실행되는 함수
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
          alert("남은 빈 재료들을 채워주세요! ㅠㅠ.");
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
      alert("모든 재료의 이름과 양을 입력하세요.");
      return;
    }

    // 입력 필드 유효성 검사
    if (!title || !description) {
      alert("입력 필드를 모두 채워주세요.");
      return;
    }

    //이미지 필드 유효성 검사
    if (!selectedFile) {
      alert("이미지는 필수값입니다.");
      return;
    }

    try {
      // 빈 값이나 널 값이 포함된 요소를 제거
      const filteredIngredients = ingredients.filter(ingredient => ingredient.name.trim() !== "" && ingredient.amount.trim() !== "");

      console.log("제목:", title, "내용:", description, "재료:", filteredIngredients, "로 폼을 제출합니다.");
      alert("등록되었습니다.");
    } catch (error) {
      console.error("오류 발생:", error);
      setError(error.message);
    }
  };

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
                        onBlur={(e) => e.target.placeholder = placeholders[index] ? `${placeholders[index]} 이름` : `재료 ${ingredient.id} 이름`}
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
                      <div className="MyVolumeDropdown">
                        <select
                          value={ingredient.volume}
                          onChange={(e) => handleVolumeChange(ingredient.id, e.target.value)}
                        >
                          <option value="">양 선택</option>
                          <option value="드롭">드롭</option>
                          <option value="대시">대시</option>
                          <option value="티스푼">티스푼</option>
                          <option value="온스">온스</option>
                          <option value="지거">지거</option>
                          <option value="컵">컵</option>
                          <option value="파인트">파인트</option>
                          <option value="병">병</option>
                          <option value="휩스">휩스</option>
                          <option value="쿼트">쿼트</option>
                          <option value="갤런">갤런</option>
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