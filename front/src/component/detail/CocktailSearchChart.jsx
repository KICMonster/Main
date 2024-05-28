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
  baseURL: 'https://localhost:9092', // 백엔드 주소
});

const CocktailSearchChart = () => {
  const [timeSlotLogs, setTimeSlotLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('today'); // 기본값: 오늘
  const [selectedHour, setSelectedHour] = useState(null); // 선택된 시간대를 상태로 추가
  const [isDataEmpty, setIsDataEmpty] = useState(false); // 데이터가 비어있는지 확인하는 상태 추가

  useEffect(() => {
    fetchData();
  }, [timeRange]); // timeRange가 변경될 때마다 데이터 다시 가져오기

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
      const response = await axiosInstance.post('/search/api/chart', {
        start: startDate,
        end: currentDate.toISOString() // 현재 시간을 UTC로 변환하여 전달
      });

      // 시간 데이터를 로컬 시간으로 변환
      const localTimeSlotLogs = response.data.map(slot => ({
        ...slot,
        hour: convertUTCToLocalHour(slot.hour)
      }));

      setTimeSlotLogs(localTimeSlotLogs);
      setIsDataEmpty(localTimeSlotLogs.length === 0); // 데이터가 비어있는지 확인
      console.log(localTimeSlotLogs);
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

  const convertUTCToLocalHour = (utcHour) => {
    const date = new Date();
    date.setUTCHours(utcHour, 0, 0, 0);
    return date.getHours();
  };

  const chartData = {
    labels: timeSlotLogs.map(log => `${log.hour}:00`), // 시간대를 라벨로 사용
    datasets: [
      {
        label: '칵테일 검색 횟수',
        data: timeSlotLogs.map(log => log.searchCount),
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

    timeSlotLogs
      .filter(log => log.hour === hour)
      .forEach(log => {
        log.views.forEach(view => {
          const cocktailName = view.name;
          if (cocktailCounts[cocktailName]) {
            cocktailCounts[cocktailName]++;
          } else {
            cocktailCounts[cocktailName] = 1;
          }
        });
      });

    const sortedCocktails = Object.entries(cocktailCounts).sort((a, b) => b[1] - a[1]);

    return sortedCocktails.slice(0, 10); // 최대 10개의 순위만 반환
  };

  const getTotalRankings = () => {
    const cocktailCounts = {};

    timeSlotLogs.forEach(log => {
      log.views.forEach(view => {
        const cocktailName = view.name;
        if (cocktailCounts[cocktailName]) {
          cocktailCounts[cocktailName]++;
        } else {
          cocktailCounts[cocktailName] = 1;
        }
      });
    });

    const sortedCocktails = Object.entries(cocktailCounts).sort((a, b) => b[1] - a[1]);

    return sortedCocktails.slice(0, 10); // 최대 10개의 순위만 반환
  };

  return (
    <BasicLayout>
      <h2>칵테일을 많이 마시는 시간대</h2>
      <div>
        <button onClick={() => setTimeRange('today')}>오늘</button>
        <button onClick={() => setTimeRange('thisWeek')}>이번 주</button>
        <button onClick={() => setTimeRange('thisMonth')}>이번 달</button>
      </div>
      <div style={{ display: 'flex', position: 'relative' }}>
        <div style={{ width: '600px', height: '400px' }}>
          <Line data={chartData} options={options} />
          {isDataEmpty && (
            <div className="overlay-message">
              <p>오늘은 아무도 검색을 하지 않았네요 ㅠㅠ</p>
              <button onClick={() => setTimeRange('thisWeek')}>이번 주</button>
              <button onClick={() => setTimeRange('thisMonth')}>이번 달</button>
            </div>
          )}
        </div>
        {!isDataEmpty && (
          <div className="ranking-container">
            <h3>검색 순위</h3>
            {selectedHour !== null && (
              <>
                <h4>{selectedHour}시 순위</h4>
                <div className="ranking-list">
                  {getSelectedRankings().map(([name, count], index) => (
                    <div className="ranking-item" key={index}>
                      <span className="ranking-position">{index + 1}</span>
                      <span className="ranking-name">{name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {selectedHour === null && (
              <>
                <h4>오늘 총 검색 순위</h4>
                <div className="ranking-list">
                  {getSelectedRankings().map(([name, count, id], index) => (
                    <div className="ranking-item" key={index}>
                      <span className="ranking-position">{index + 1}</span>
                      <Link to={`/cocktail/${id}`} className="ranking-name">{name}</Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </BasicLayout>
  );
};

export default CocktailSearchChart;