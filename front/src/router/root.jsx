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
const CraftPage = lazy(() => import('../pages/information/CraftPage'));
const HistoryPage = lazy(() => import('../pages/information/HistoryPage'));
const TrendNews = lazy(() => import('../pages/information/TrendNews'));
const AnalysisComplete = lazy(() => import('../pages/AnalysisComplete'));
const Weather = lazy(() => import('../component/main/Weather'));
const TasteAnalysis = lazy(() => import('../component/detail/TasteAnalysis'));
const GisPage = lazy(() => import('../pages/GisPage'));
const ViewPage = lazy(() => import('../pages/cocktail/ViewPage'));
const RecommendCocktail = lazy(() => import('../pages/cocktail/RecommendCocktail'));
const MyCocktail = lazy(() => import('../pages/contents/MyCocktail'));
const Snackpage = lazy(() => import('../pages/cocktail/Snackpage'));
const CustomCocktail = lazy(() => import('../pages/cocktail/CustomCocktail'));
const TasteStart = lazy(() => import('../pages/contents/TasteStart'));
const CocktailSearchChart = lazy(() => import('../component/detail/CocktailSearchChart'));
const MyPage = lazy(() => import('../pages/Mypage'));

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
    path: '/cocktail/:cocktailId',
    element: withSuspense(CocktailDetail),
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
        path: 'complete',
        element: withSuspense(AnalysisComplete),
      },
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
    path: '/recommend',
    element: withSuspense(RecommendCocktail),
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
]);

export default root;