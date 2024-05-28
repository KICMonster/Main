import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import LoginRouter from './LoginRouter';

import AdditionalForm from '../component/login/AdditionalForm';
import { Suspense } from 'react';

import IngredientPage from '../pages/cocktail/IngredientPage';

import CocktailDetail from '../pages/cocktail/CocktailDetail';
import CraftPage from '../pages/information/CraftPage';
import HistoryPage from '../pages/information/HistoryPage';
import TrendNews from '../pages/information/TrendNews';
import AnalysisComplete from '../pages/AnalysisComplete';
import Weather from '../component/main/Weather';
import TasteAnalysis from '../component/detail/TasteAnalysis';
import GisPage from '../pages/GisPage';
import ViewPage from '../pages/cocktail/ViewPage';
import RecommendCocktail from '../pages/cocktail/RecommendCocktail';
import MyCocktail from '../pages/contents/MyCocktail';
import Snackpage from '../pages/cocktail/Snackpage';
import CustomCocktail from '../pages/contents/CustomCocktail';
import CustomCocktailPage from '../pages/cocktail/CustomCocktailPage';
import TasteStart from '../pages/contents/TasteStart';
import CocktailSearchChart from '../component/detail/CocktailSearchChart';
import MyPage from '../pages/Mypage';



const root = createBrowserRouter([
  {
    path: '',
    element: <Home />         //메인화면
  },
  {
    path: '/login',
    element: <LoginPage />,
    children: LoginRouter() // LoginRouter()가 객체를 반환하므로 이를 바로 사용     //로그인
  },
  {
    path: '/additional',
    element: <AdditionalForm />           //회원가입   
  },
  {
    path: '/ViewPage',
    element: <ViewPage />                  // 칵테일 리스트
  },
  {
    path: '/ViewPage/:id',
    element: <ViewPage />                  // 칵테일 리스트
  },
  {
    path: '/cocktail/:cocktailId',
    element: <CocktailDetail /> // 칵테일 상세 페이지
  },
  {
    path: '/Ingredient',
    element: <IngredientPage />             //재료리스트
  },
  {
    path: '/history',
    element: <HistoryPage />                //역사 페이지
  },
  {
    path: '/craft/:key',
    element: <CraftPage />                     //기초제조법페이지
  },
  {
    path: '/tastestart',
    element: <TasteStart />             //재료리스트
  },
  {
    path: '/taste', // 기호조사. 필요 페이지와 연결할것.지금은 home.jsx에 버튼. 회원가입 페이지와 연결할 경우 로직 수정할 필요.   
    element: <TasteAnalysis />, // 회원가입 로직과 연결 할 시 프론트 경로작업&비동기 통신전달값 추가 후 백엔드에 문의
    children: [
      {
        path: 'complete', // '/taste'의 하위 경로로 'complete'를 정의
        element: <AnalysisComplete /> // '/taste/complete'에 해당하는 컴포넌트
      }
    ]
  },
  {
    path: '/trendNews',       // 뉴스 경로. 조정 필요. 
    element: <TrendNews />
  },
  {
    path: '/weather',
    element: <Weather />
  },
  {
    path: '/mapsearch',
    element: <GisPage />        //Gis페이지 
  },
  {
    path: '/recommend',         // 칵테일 추천 페이지
    element: <RecommendCocktail />
  },
  {
    path: '/customcocktail', // 커스텀 칵테일
    element: <CustomCocktail />
  },
  {
    path: '/mycocktail', // 커스텀 칵테일 게시판
    element: <MyCocktail />
  },
  {
    path: '/snack/:id',
    element: <Snackpage />
  },
  {
    path: '/custom-cocktail',
    element: <CustomCocktailPage /> // 커스텀 칵테일 페이지
  },
  {
    path: '/chart',
    element: <CocktailSearchChart /> // 커스텀 칵테일 페이지
  },
  {
    path: '/mypage',
    element: <MyPage /> // 커스텀 칵테일 페이지
  }
]);

export default root;