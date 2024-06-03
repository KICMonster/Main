import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import '../../component/main/styles/CocktailSearchChart.css'; // 추가한 CSS 파일을 임포트
import BasicLayout from '../../layouts/BasicLayout';
import { Link } from 'react-router-dom';

// Chart.js에 필요한 스케일과 요소들을 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const CocktailSearchChart = () => {
  const [viewLogs, setViewLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('today'); // 기본값: 오늘
  const [category, setCategory] = useState('cocktail'); // 기본값: 칵테일
  const [isDataEmpty, setIsDataEmpty] = useState(false); // 데이터가 비어있는지 확인하는 상태 추가

  useEffect(() => {
    fetchData();
  }, [timeRange, category]); // 카테고리 변경에도 반응하도록 useEffect 수정

  const fetchData = async () => {
    try {
      const currentDate = new Date();
      let startDate;

      // 시간 범위에 따라 시작 날짜 결정
      switch (timeRange) {
        case 'today':
          startDate = getStartOfToday(currentDate);
          break;
        case 'thisWeek':
          startDate = getStartOfThisWeek(currentDate);
          break;
        case 'thisMonth':
          startDate = getStartOfThisMonth(currentDate);
          break;
        default:
          break;
      }

      // 서버에 시간 범위 데이터 보내기
      const response = await axiosInstance.post('/search/chart', {
        start: startDate,
        end: currentDate.toISOString(),
        category,
        gender: null,
        birth: null
      });

      console.log(response.data);
      const logs = response.data.map(log => ({
        ...log,
        viewDate: new Date(log.viewDate).toLocaleString()
      }));

      setViewLogs(logs);
      setIsDataEmpty(logs.length === 0); // 데이터가 비어있는지 확인
    } catch (error) {
      console.error('Error fetching search logs:', error);
      setIsDataEmpty(true); // 오류 발생 시 데이터가 비어있는 것으로 간주
    }
  };

  const getStartOfToday = (date) => {
    const startOfToday = new Date(date);
    startOfToday.setHours(0, 0, 0, 0);
    return startOfToday.toISOString();
  };

  const getStartOfThisWeek = (date) => {
    const startOfThisWeek = new Date(date);
    startOfThisWeek.setDate(date.getDate() - date.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);
    return startOfThisWeek.toISOString();
  };

  const getStartOfThisMonth = (date) => {
    const startOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    startOfThisMonth.setHours(0, 0, 0, 0);
    return startOfThisMonth.toISOString();
  };

  const chartData = {
    labels: viewLogs.map(log => log.viewDate), // 시간대를 라벨로 사용
    datasets: [
      {
        label: '칵테일 검색 횟수',
        data: viewLogs.map(log => 1), // 각 로그는 하나의 검색으로 간주
        fill: false,
        borderColor: 'rgb(13, 12, 34)', // 연보라색으로 변경
        tension: 0.1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // y축 눈금을 1 단위로 설정
        }
      }
    }
  };

  return (
    <BasicLayout>
      <div className="time">
        <h2>칵테일을 많이 마시는 시간대</h2>
        <div className="button-group">
          <button onClick={() => setTimeRange('today')}>오늘</button>
          <button onClick={() => setTimeRange('thisWeek')}>이번 주</button>
          <button onClick={() => setTimeRange('thisMonth')}>이번 달</button>
          {/* 카테고리 선택 추가 */}
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="cocktail">Cocktail</option>
            <option value="customCocktail">Custom Cocktail</option>
          </select>
        </div>
      </div>
      <div className="chart">
        <Line data={chartData} options={options} />
      </div>
      {isDataEmpty && (
        <div className="overlay-message">
          <p>오늘은 아무도 검색을 하지 않았네요 ㅠㅠ</p>
          <button onClick={() => setTimeRange('thisWeek')}>이번 주</button>
          <button onClick={() => setTimeRange('thisMonth')}>이번 달</button>
        </div>
      )}
    </BasicLayout>
  );
};

export default CocktailSearchChart; 