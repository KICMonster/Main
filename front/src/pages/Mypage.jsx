import React, { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import './MyPage.css';

function MyPage() {
  const [nickname, setNickname] = useState();
  const [profileImage, setProfileImage] = useState(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageDelete = () => {
    setProfileImage(null);
  };
  
  const handleApply = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const response = await fetch('/api/myPage/profileImage', {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          alert('프로필 사진이 성공적으로 업데이트 되었습니다.');
        } else {
          throw new Error('서버 에러');
        }
      } catch (error) {
        alert('사진 업로드 중 에러 발생: ' + error.message);
      }
    }
  };
  return (
    <BasicLayout>
      <div className="myPage">
        <h2>프로필 수정</h2>
        <p>대표 프로필과 별명을 수정하실 수 있습니다.</p>
        <div className="profile-section">
          <div className="profile-picture">
            <img src={profileImage || 'default-profile.png'} alt="Profile" />
          </div>
          <div className="nickname-section">
            <label>별명</label>
            <input type="text" value={nickname} onChange={handleNicknameChange} />
            <div className="image-buttons">
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
              <button onClick={() => document.getElementById('fileInput').click()}>사진변경</button>
              <button onClick={handleImageDelete}>삭제</button>
            </div>
          </div>
        </div>
        <div className="buttons">
        <button onClick={handleApply}>적용</button>
          <button>취소</button>
        </div>
      </div>
    </BasicLayout>
  );
}

export default MyPage;