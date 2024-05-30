import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/CocktailDetail.css';
import { Link } from "react-router-dom";

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
                const snackEndpoint = `https://localhost:9092/api/snack/${id}`; // 안주

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
            <div className="container" style={{ paddingRight: '42px', marginTop: '150px' }}>
                <div className="leftColumn" style={{ gridColumn: '1 / 4' }}>
                    <div className="imageBox">
                        <img src={snack.image} alt={snack.name} style={{ height: '600px', width: '600px' }} />
                    </div>
                </div>
                <div className="rightColumn" style={{ gridColumn: '4 / span 3' }}>
                    <div className="contentBox">
                        <div className="snackTitle">
                            <h1 className="cocktailName" >{snack.name}</h1>
                            <hr className="divider" />
                            <h2 className="sectionTitle">Instructions:</h2>
                            <p>{snack.description}</p>
                        </div>
                        <div className="cocktailList">
                            <h2 className="sectionTitle">Appetizers:</h2>
                            {cocktail.map((item, index) => (
                                <div key={index}>
                                    <Link className="AppetizersLine" to={`/cocktail/${item.id}`}>
                                        
                                            <img src={item.imageUrl} alt={item.name} />
                                            <h6>{item.name}</h6>
                                    
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}

export default Snackpage;