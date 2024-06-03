import React, { useState, useEffect } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import '../component/main/styles/MyPage.css';
import { Link } from 'react-router-dom';
import defaultProfile from "../img/default.png"

function MyPage() {
  const [nickname, setNickname] = useState('');  // 초기값을 빈 문자열로 설정 : undefined가 변경되면 에러가 발생하기 때문
  const [profileImage, setProfileImage] = useState(defaultProfile);  // 프로필 이미지 URL 상태
  const [file, setFile] = useState(null);  // 파일 상태 추가
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // 사용자 정보 불러오기 추가 - 김태연
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('jwt'); // 로컬스토리지에서 토큰 값을 읽기
      try {
        const response = await fetch('https://luvcocktail.site/api/myPage', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNickname(data.name); // 이름(별명) 상태 업데이트
          setProfileImage(data.imageUrl); // 프로필 이미지 URL 업데이트
          setGender(data.gender); // 성별 상태 업데이트
          setBirth(data.birth); // 생년월일 상태 업데이트
          setEmail(data.email); // 이메일 상태 업데이트
          setPhone(data.phone); // 전화번호 상태 업데이트
        } else {
          throw new Error('프로필 정보를 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        alert('프로필 불러오기 에러: ' + error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);  // 별명 변경 처리
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);  // 파일 상태 업데이트
      setProfileImage(URL.createObjectURL(selectedFile));  // 프로필 이미지 URL 업데이트
    }
  };

  const handleImageDelete = () => {
    setProfileImage(defaultProfile);  // 기본 프로필 이미지로 변경
    setFile(null);  // 파일 상태 초기화
  };

  const handleApply = async () => {
    const token = localStorage.getItem('jwt');  // 로컬스토리지에서 토큰 값 읽기

    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);  // 파일 데이터를 formData에 추가
      formData.append('introduction', nickname);

      try {
        const response = await fetch('https://luvcocktail.site/api/myPage/profileImage', {
          method: 'PUT',
          body: formData,
          headers: {
            'Authorization': `Bearer ${token}`  // Authorization 헤더에 토큰 추가
          }
        });

        if (response.ok) {
          alert('프로필 사진이 성공적으로 업데이트 되었습니다.');
        } else {
          throw new Error('서버 에러');
        }
      } catch (error) {
        alert('사진 업로드 중 에러 발생: ' + error.message);
      }
    } else {
      alert('업로드할 파일이 선택되지 않았습니다.');
    }
  };

  return (
    <BasicLayout>
      <div className="myPage">
        <h2>프로필 수정</h2>
        <p>대표 프로필과 별명을 수정하실 수 있습니다.</p>
        <div className="profile-section">
          <div className="profile-picture">
            <img src={profileImage || defaultProfile} alt="Profile" />
            <div className="image-buttons">
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                setProfileImage(URL.createObjectURL(selectedFile));
              }} />
              <button onClick={() => document.getElementById('fileInput').click()}>변경</button>
              <button onClick={handleImageDelete}>삭제</button> {/* 변경 */}
            </div>
          </div>
          <div className="nickname-section">
            <label>별명</label>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            <label>성별</label>
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            <label>생일</label>
            <input type="text" value={birth} onChange={(e) => setBirth(e.target.value)} />
            <label>이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>전화번호</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <div className="buttons">
          <Link to="/">
            <button onClick={handleApply} className="apply">적용</button>
          </Link>
          <button className="cancel">취소</button>
        </div>
      </div>
    </BasicLayout>
  );
}

export default MyPage;