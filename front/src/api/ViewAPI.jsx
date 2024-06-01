import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
 
// 칵테일 조회수를 업데이트하는 비동기 함수
const updateCocktailViews = async ({ id, timestamp }) => {
  // 칵테일 조회수 업데이트를 위한 PUT 요청
  await axiosInstance.put(`/view/cocktails/${id}`, { timestamp });
};

// 칵테일 조회수 업데이트를 위한 커스텀 훅
export const useUpdateCocktailViews = () => {
    const queryClient = useQueryClient();
  
    return useMutation(updateCocktailViews, {
      onSuccess: (data, variables) => {
        // 서버에서 반환된 업데이트된 조회수를 사용하여 칵테일 정보 업데이트
        queryClient.setQueryData('cocktails', oldData => {
          return oldData.map(cocktail =>
            cocktail.id === variables.id
              ? { ...cocktail, viewCount: data } // 서버에서 반환한 조회수로 업데이트
              : cocktail
          );
        });
      },
    });
  };
 