import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/snackpage.css';

function Snackpage() {
    // 스낵 데이터를 저장할 상태를 선언
    const [cocktail, setCocktail] = useState([]);
    const [snack, setSnack] = useState({});
    const [error, setError] = useState(null);

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 데이터를 가져옴
    useEffect(() => {
        // 윈도우 주소에서 ID 추출
        const pathname = window.location.pathname;
        const id = pathname.split('/').pop();

        // 스낵 데이터를 비동기적으로 가져오는 함수 선언
        const fetchSnackData = async () => {
            try {
                // API 엔드포인트 설정
                const cocktailEndpoint = `https://localhost:9092/api/cocktail`;      // 칵테일 
                const snackEndpoint = `https://localhost:9092/api/ingredient/${id}`; // 안주

                // 칵테일 데이터 가져오기
                const cocktailResponse = await fetch(cocktailEndpoint);
                const cocktailData = await cocktailResponse.json();
                setCocktail(cocktailData.slice(0, 3));

                // 스낵 데이터 가져오기
                const snackResponse = await fetch(snackEndpoint);
                const snackData = await snackResponse.json();
                setSnack(snackData);

                // 에러 상태 초기화
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                // 에러 상태 업데이트
                setError(error.message);
            }
        };

        // 데이터 가져오는 함수 호출
        fetchSnackData();
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    // 에러가 발생한 경우 에러 메시지를 화면에 표시
    if (error) {
        return (
            <BasicLayout>
                <div>Error: {error}</div>
            </BasicLayout>
        );
    }

    // 스낵 데이터와 칵테일 데이터를 화면에 렌더링
    return (
        <BasicLayout>
            <div className="snackBody">
                <div className="snackImageContainer">
                    <img src={snack.image} alt={snack.name} />
                </div>
                <div className="snackDescription">
                    <div className="snackTitle">
                        <h1>{snack.name}</h1>
                        <p>{snack.description}</p>
                    </div>
                    <div className="cocktailList">
                        {cocktail.map((item, index) => (
                            <div key={index} >
                                <img src={item.image || 'default-image-url.jpg'} alt={item.name} />
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default Snackpage;