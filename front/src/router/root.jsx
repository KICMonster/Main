import { createBrowserRouter } from 'react-router-dom';
import Home from '../page/Home';
import LoginPage from '../page/LoginPage';
import LoginRouter from './LoginRouter';
import Mypage from '../page/Mypage';

const root = createBrowserRouter([
  {
    path: '',
    element: <Home />
  },
  {
    path: '/login',
    element: <LoginPage />,
    children: LoginRouter() // LoginRouter()가 객체를 반환하므로 이를 바로 사용
  },
  {
    path: 'mypage',
    element: <Mypage/>
  }
]);

export default root;