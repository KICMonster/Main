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
import '../../component/main/styles/CocktailSearchChart.css';
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
  const [selectedHour, setSelectedHour] = useState(null); // 선택된 시간대를 상태로 추가
  const [isDataEmpty, setIsDataEmpty] = useState(false); // 데이터가 비어있는지 확인하는 상태 추가
  const [category, setCategory] = useState('cocktail'); // 기본 카테고리
  const [gender, setGender] = useState(null); // 기본 성별
  const [birth, setBirth] = useState(null); // 기본 출생 연도

  useEffect(() => {
    fetchData();
  }, [timeRange, category, gender, birth]); // timeRange, category, gender, birth가 변경될 때마다 데이터 다시 가져오기

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

      // 서버에 시간 범위와 추가 필드 데이터 보내기
      const response = await axiosInstance.post('/search/chart', {
        start: startDate,
        end: currentDate.toISOString(), // 현재 시간을 UTC로 변환하여 전달
        category: category,
        gender: gender,
        birth: birth
      });

      // 시간 데이터를 로컬 시간으로 변환
      const localViewLogs = response.data.map(log => ({
        ...log,
        viewDate: new Date(log.viewDate)
      }));

      setViewLogs(localViewLogs);
      setIsDataEmpty(localViewLogs.length === 0); // 데이터가 비어있는지 확인
      console.log(localViewLogs);
    } catch (error) {
      console.error('Error fetching view logs:', error);
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
    labels: [...new Set(viewLogs.map(log => `${log.viewDate.getHours()}:00`))], // 시간대를 라벨로 사용
    datasets: [
      {
        label: '칵테일 조회 횟수',
        data: viewLogs.reduce((acc, log) => {
          const hour = log.viewDate.getHours();
          acc[hour] = (acc[hour] || 0) + 1;
          return acc;
        }, {}),
        fill: false,
        borderColor: 'rgb(147, 112, 219)', // 연보라색으로 변경
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
    },
    onClick: function (event, elements) {
      if (elements.length > 0) {
        const clickedHour = chartData.labels[elements[0].index].split(':')[0];
        handleHourClick(parseInt(clickedHour)); // 시간대 클릭 시 해당 시간대 선택
      } else {
        setSelectedHour(null); // 선택된 시간대가 없을 때 전체 검색
        fetchData(); // 데이터 다시 가져오기
      }
    }
  };

  const handleHourClick = (hour) => {
    if (selectedHour === hour) {
      setSelectedHour(null); // 이미 선택된 시간대를 다시 클릭하면 선택 해제
    } else {
      setSelectedHour(hour); // 클릭한 시간대를 선택
    }
  };

  const getSelectedRankings = () => {
    if (selectedHour !== null) {
      return getRankings(selectedHour);
    } else {
      return getTotalRankings(); // 선택된 시간대가 없으면 총 검색 순위 반환
    }
  };

  const getRankings = (hour) => {
    const cocktailCounts = {};

    viewLogs
      .filter(log => log.viewDate.getHours() === hour)
      .forEach(log => {
        const cocktailName = log.cocktailName || log.customCocktailName;
        const cocktailCategory = log.cocktailName ? 'cocktail' : 'customCocktail';
        if (cocktailCounts[cocktailName]) {
          cocktailCounts[cocktailName].count++;
        } else {
          cocktailCounts[cocktailName] = { count: 1, id: log.cocktailId, category: cocktailCategory };
        }
      });

    const sortedCocktails = Object.entries(cocktailCounts).sort((a, b) => b[1].count - a[1].count);

    return sortedCocktails.slice(0, 10); // 최대 10개의 순위만 반환
  };

  const getTotalRankings = () => {
    const cocktailCounts = {};

    viewLogs.forEach(log => {
      const cocktailId = log.cocktailId;
      const cocktailName = log.cocktailName || log.customCocktailName;
      const cocktailCategory = log.cocktailName ? 'cocktail' : 'customCocktail';
      if (cocktailCounts[cocktailName]) {
        cocktailCounts[cocktailName].count++;
      } else {
        cocktailCounts[cocktailName] = { count: 1, id: cocktailId, category: cocktailCategory };
      }
    });

    const sortedCocktails = Object.entries(cocktailCounts).sort((a, b) => b[1].count - a[1].count);

    return sortedCocktails.slice(0, 10); // 최대 10개의 순위만 반환
  };

  return (
    <BasicLayout>
      <div className="time">
        <h2>칵테일을 많이 마시는 시간대</h2>
        <div className="button-group">
          <button onClick={() => setTimeRange('today')}>오늘</button>
          <button onClick={() => setTimeRange('thisWeek')}>이번 주</button>
          <button onClick={() => setTimeRange('thisMonth')}>이번 달</button>
        </div>
        <div className="button-group22">
          <label>
            카테고리:
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="cocktail">칵테일</option>
              <option value="customCocktail">커스텀 칵테일</option>
            </select>
          </label>
          <label>
            성별:
            <select value={gender || ''} onChange={(e) => setGender(e.target.value || null)}>
              <option value="">모두</option>
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          </label>
          <label>
            출생 연도:
            <input
              type="number"
              value={birth ?? ''}
              onChange={(e) => setBirth(e.target.value ? parseInt(e.target.value, 10) : null)}
              min="0"
              max="99"
              placeholder="예: 85"
            />
          </label>
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
      {!isDataEmpty && (
        <div className="ranking-container">
          <h3>검색 순위</h3>
          {selectedHour === null && (
            <>
              <div className="ranking-list">
                {getSelectedRankings().map(([name, details], index) => (
                  <Link
                    to={details.category === 'customCocktail' ? `/customcocktail/${details.id}` : `/cocktail/${details.id}`}
                    className="ranking-item"
                    key={index}
                  >
                    <span className="ranking-position">{index + 1}</span>
                    <span className="ranking-name">{name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </BasicLayout>
  );
};

export default CocktailSearchChart;

