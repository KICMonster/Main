import React, { useState, useEffect } from 'react';
import MapContainer from '../component/detail/MapContainer';
import BasicLayout from '../layouts/BasicLayout';
import '../component/main/styles/GisPage.css';
import { Link } from 'react-router-dom';

function GisPage() {
  const [places, setPlaces] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  const fetchPlaces = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://localhost:9092/api/gis/get?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPlaces(data.documents || []);
    } catch (error) {
      console.error('Failed to fetch places:', error);
      setPlaces([]);
    }
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
            fetchPlaces(latitude, longitude);
          },
          error => {
            console.error('Geolocation error:', error);
            setPlaces([]);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setPlaces([]);
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (currentPosition) {
      fetchPlaces(currentPosition.latitude, currentPosition.longitude);
    }
  }, [currentPosition]);

  const handleMarkerClick = (latitude, longitude) => {
    setCurrentPosition({ latitude, longitude });
  };

  return (
    <BasicLayout>
      <div className="GisContainer">
        <div className="GisSidebar">
          <ul>
            {places && places.length > 0 ? (
              places
                .sort((a, b) => a.distance - b.distance)
                .map((place, index) => (
                  <Link to={place.place_url} key={index}>
                    <li className="GisPlaceItem">
                      <p style={{ textDecoration: "none"}} className="GisPlaceName">{place.place_name}</p>
                      <p className="GisAddressName">{place.address_name}</p>
                      <p className="GisPhone">{place.distance}m</p>
                      <p className="GisPhone">전화번호: {place.phone}</p>
                    </li>
                  </Link>
                ))
            ) : (
              <div className="GisPlaceEmpty">
                <h1>😭</h1>
                <p>정보가 없습니다.</p>
              </div>
            )}
          </ul>
        </div>
        <div className="GisMapContainer">
          <MapContainer onMarkerClick={handleMarkerClick} />
        </div>
      </div>
    </BasicLayout>
  );
}

export default GisPage;