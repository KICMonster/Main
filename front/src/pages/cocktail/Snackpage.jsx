import React, { useState, useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/CocktailDetail.css';
import { Link } from "react-router-dom";
import axios from 'axios';
 



const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
  });
  
function Snackpage() {
    // 스낵 데이터를 저장할 상태를 선언
    const [cocktail, setCocktail] = useState([]);
    const [snack, setSnack] = useState({});
    const [error, setError] = useState(null);

    // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 데이터를 가져옴
    useEffect(() => {
        // 윈도우 주소에서 ID 추출
        const pathname = window.location.pathname;
        const id = pathname.split('/').pop();               // 시간 남으면 태연 고치기

        // 스낵 데이터를 비동기적으로 가져오는 함수 선언
        const fetchSnackData = async () => {
            try {
                // API 엔드포인트 설정
                const cocktailEndpoint = `/cocktail`;      // 칵테일 
                const snackEndpoint = `/snack/${id}`; // 안주

                // 칵테일 데이터 가져오기
                const cocktailResponse = await axiosInstance.get(cocktailEndpoint);
                // const cocktailData = await cocktailResponse.json();
                setCocktail(cocktailResponse.data.slice(0, 4));
                // setCocktail(cocktailData.slice(0, 3));

                // 스낵 데이터 가져오기
                const snackResponse = await axiosInstance.get(snackEndpoint);
                // const snackData = await snackResponse.json();
                setSnack(snackResponse.data);

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
                        <img src={snack.image} alt={snack.name} style={{ height: '576px', width: '100%' }} className="cocktailImage" />
                    </div>
                </div>
                <div className="rightColumn" style={{ gridColumn: '4 / span 3' }}>
                    <div className="contentBox">
                        <h1 className="cocktailName" >{snack.name}</h1>
                        <hr className="divider" />
                        <h2 className="sectionTitle">디저트 설명:</h2>
                        <p>{snack.description}</p>
                        <h2 className="sectionTitle">디저트와 어울리는 칵테일:</h2>
                        <div className="appetizersContainer">
                            {cocktail.map((item, index) => (
                                <div key={index} className="appetizerBox">
                                    <Link to={`/cocktail/${item.id}`}>
                                        <img src={item.imageUrl} alt={item.name} className="appetizerImage" />
                                        <h6>
                                            {item.name.length > 7 ? item.name.slice(0, 7) + '...' : item.name}
                                        </h6>
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