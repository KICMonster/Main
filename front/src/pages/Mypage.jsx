// import React, { useState } from 'react';
// import BasicLayout from '../layouts/BasicLayout';
// import './MyPage.css';

// function MyPage() {
//   const [nickname, setNickname] = useState();
//   const [profileImage, setProfileImage] = useState(null);

//   const handleNicknameChange = (e) => {
//     setNickname(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfileImage(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleImageDelete = () => {
//     setProfileImage(null);
//   };
  
//   const handleApply = async () => {
//     if (file) {
//       const formData = new FormData();
//       formData.append('profileImage', file);

//       try {
//         const response = await fetch('https://localhost:9092/api/myPage/profileImage', {
//           method: 'PUT',
//           body: formData,
//         });

//         if (response.ok) {
//           alert('프로필 사진이 성공적으로 업데이트 되었습니다.');
//         } else {
//           throw new Error('서버 에러');
//         }
//       } catch (error) {
//         alert('사진 업로드 중 에러 발생: ' + error.message);
//       }
//     }
//   };  
//   return (
//     <BasicLayout>
//       <div className="myPage">
//         <h2>프로필 수정</h2>
//         <p>대표 프로필과 별명을 수정하실 수 있습니다.</p>
//         <div className="profile-section">
//           <div className="profile-picture">
//             <img src={profileImage || 'default-profile.png'} alt="Profile" />
//           </div>
//           <div className="nickname-section">
//             <label>별명</label>
//             <input type="text" value={nickname} onChange={handleNicknameChange} />
//             <div className="image-buttons">
//               <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
//               <button onClick={() => document.getElementById('fileInput').click()}>사진변경</button>
//               <button onClick={handleImageDelete}>삭제</button>
//             </div>
//           </div>
//         </div>
//         <div className="buttons">
//         <button onClick={handleApply}>적용</button>
//           <button>취소</button>
//         </div>
//       </div>
//     </BasicLayout>
//   );
// }

// export default MyPage;
import React, { useState } from 'react';
import BasicLayout from '../layouts/BasicLayout';
import './MyPage.css';
import { Link } from 'react-router-dom';

function MyPage() {
  const [nickname, setNickname] = useState('');  // 초기값을 빈 문자열로 설정 : undefined가 변경되면 에러가 발생하기 때문
  const [profileImage, setProfileImage] = useState(null);  // 프로필 이미지 URL 상태
  const [file, setFile] = useState(null);  // 파일 상태 추가

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
    setProfileImage(null);  // 프로필 이미지 URL 초기화
    setFile(null);  // 파일 상태 초기화
  };
  
  const handleApply = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);  // 파일 데이터를 formData에 추가

      try {
        const response = await fetch('https://localhost:9092/api/myPage/profileImage', {
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
            <img src={profileImage || 'default-profile.png'} alt="Profile" />
          </div>
          <div className="nickname-section">
            <label>별명</label>
            <input type="text" value={nickname} onChange={handleNicknameChange} />
            <div className="image-buttons">
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageChange} />
              <button onClick={() => document.getElementById('fileInput').click()}>사진 변경</button>
              <button onClick={handleImageDelete}>삭제</button>
            </div>
          </div>
        </div>
        <div className="buttons">
          <Link to="/">
          <button onClick={handleApply}>적용</button>
          </Link>
          <button>취소</button>
        </div>
      </div>
    </BasicLayout>
  );
}

export default MyPage;
