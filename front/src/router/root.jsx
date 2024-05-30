import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LoginRouter from './LoginRouter';
import Loading from '../pages/Loading';

// Lazy loading을 위한 컴포넌트들
const Home = lazy(() => import('../pages/Home'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const AdditionalForm = lazy(() => import('../component/login/AdditionalForm'));
const IngredientPage = lazy(() => import('../pages/cocktail/IngredientPage'));
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

// Suspense를 적용하여 각 컴포넌트를 래핑하는 함수
const withSuspense = (Component) => {
  return (
    <Suspense fallback={<Loading/>}>
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
    path: '/cocktail/:customNm',  
    element: withSuspense(CocktailDetail),
  },
  {
    path: '/customcocktail/:cocktailId', // 커스텀 칵테일 디테일 페이지 라우팅 설정
    element: withSuspense(CustomCocktailDetail),
  },
  {
    path: '/ingredient',
    element: withSuspense(IngredientPage),
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
    path: '/taste',
    element: withSuspense(TasteAnalysis),
    children: [
      {
        path: 'complete', // 상대 경로로 수정
        element: withSuspense(AnalysisComplete),
      }
    ],
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
    path: '/customcocktail',
    element: withSuspense(CustomCocktail),
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