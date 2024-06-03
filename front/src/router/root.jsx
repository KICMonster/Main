import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoginRouter from './LoginRouter';
import Loading from '../pages/Loading';


// Lazy loading을 위한 컴포넌트들
const Home = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const AdditionalForm = lazy(() => import('../component/login/AdditionalForm'));
const CocktailDetail = lazy(() => import('../pages/cocktail/CocktailDetail'));
const CustomCocktailDetail = lazy(() => import('../pages/cocktail/CustomCocktailDetail'));
const CraftPage = lazy(() => import('../pages/information/CraftPage'));
const HistoryPage = lazy(() => import('../pages/information/HistoryPage'));
const TrendNews = lazy(() => import('../pages/information/TrendNews'));
const AnalysisComplete = lazy(() => import('../pages/AnalysisComplete'));
const Weather = lazy(() => import('../component/main/Weather'));
const TasteAnalysis = lazy(() => import('../component/detail/TasteAnalysis'));
const GisPage = lazy(() => import('../pages/GisPage'));
const ViewPage = lazy(() => import('../pages/cocktail/ViewPage'));
const MyCocktail = lazy(() => import('../pages/contents/MyCocktail'));
const Snackpage = lazy(() => import('../pages/cocktail/Snackpage'));
const CustomCocktail = lazy(() => import('../pages/cocktail/CustomCocktail'));
const TasteStart = lazy(() => import('../pages/contents/TasteStart'));
const CocktailSearchChart = lazy(() => import('../component/detail/CocktailSearchChart'));
const MyPage = lazy(() => import('../pages/Mypage'));
const SearchViewPage = lazy(() => import('../pages/cocktail/SearchViewPage'));
const EditCocktail = lazy(() => import ( '../pages/contents/EditCocktail'));
// Suspense를 적용하여 각 컴포넌트를 래핑하는 함수
const withSuspense = (Component) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

const root = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Home),
  },
  {
    path: '/login',
    element: withSuspense(LoginPage),
    children: LoginRouter(),
  },
  {
    path: '/additional',
    element: withSuspense(AdditionalForm),
  },
  {
    path: '/viewpage',
    element: withSuspense(ViewPage),
  },
  {
    path: '/viewpage/:id',
    element: withSuspense(ViewPage),
  },
  {
    path: '/customcocktail',
    element: withSuspense(CustomCocktail),
  },
  {
    path: '/cocktail/:cocktailId',
    element: withSuspense(CocktailDetail),
  },
  {
    path: '/customcocktail/EditCocktail/:cocktailId',
    element: withSuspense(EditCocktail),
  },
  {
    path: '/customcocktail/:cocktailId', // 커스텀 칵테일 디테일 페이지 라우팅 설정
    element: withSuspense(CustomCocktailDetail),
  },
  {
    path: '/history',
    element: withSuspense(HistoryPage),
  },
  {
    path: '/craft/:key',
    element: withSuspense(CraftPage),
  },
  {
    path: '/tastestart',
    element: withSuspense(TasteStart),
  },
  {
    path: '/taste', // 기호조사. 필요 페이지와 연결할것.지금은 home.jsx에 버튼. 회원가입 페이지와 연결할 경우 로직 수정할 필요.   
    element: withSuspense(TasteAnalysis), // 회원가입 로직과 연결 할 시 프론트 경로작업&비동기 통신전달값 추가 후 백엔드에 문의
    children: [
      {
        path: 'complete', // '/taste'의 하위 경로로 'complete'를 정의
        element: withSuspense(AnalysisComplete), // '/taste/complete'에 해당하는 컴포넌트
      }
    ]
  },
  {
    path: '/trendnews',
    element: withSuspense(TrendNews),
  },
  {
    path: '/weather',
    element: withSuspense(Weather),
  },
  {
    path: '/mapsearch',
    element: withSuspense(GisPage),
  },
  {
    path: '/mycocktail',
    element: withSuspense(MyCocktail),
  },
  {
    path: '/snack/:id',
    element: withSuspense(Snackpage),
  },
  {
    path: '/chart',
    element: withSuspense(CocktailSearchChart),
  },
  {
    path: '/mypage',
    element: withSuspense(MyPage),
  },
  {
    path: '/search/:name',
    element: withSuspense(SearchViewPage)
  },

]);

export default root;