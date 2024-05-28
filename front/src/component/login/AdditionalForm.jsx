import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import BasicLayout from "../../layouts/BasicLayout";
import '../../component/main/styles/login.css'


function AdditionalForm() {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const emailFromQuery = queryParams.get('email'); // 'email' 쿼리 파라미터의 값을 가져옵니다.

  const [email, setEmail] = useState(emailFromQuery || ''); // 쿼리 파라미터가 없는 경우를 대비해 기본값을 설정합니다.
  // pw val  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validatePassword = (password) => {
    // 조건: 영문자, 숫자, 특수문자 중 2가지 이상 조합, 8자리 이상
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[@$!%*#?&]/.test(password);
    const isValidLength = password.length >= 8;
    const validCombinationCount = [hasLetter, hasNumber, hasSpecialChar].filter(Boolean).length >= 2;

    return isValidLength && validCombinationCount;
  }

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);

    if (!validatePassword(value)) {
      setPasswordError('비밀번호는 영어, 숫자, 특수문자 중 2가지 이상 조합이며, 8자리 이상이어야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    if (password !== value) {
      setConfirmPasswordError('비밀번호가 같지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };


  // 핸드폰 번호 유효성 검사
  const validatePhone = (phone) => {
    return /^\d{11,12}$/.test(phone);
  }

  // 이름 유효성 검사
  const validateName = (name) => {
    if (/[^a-zA-Z가-힣]/.test(name)) return false; // 영어와 한글 외 문자가 있을 경우
    if (/[가-힣]/.test(name) && name.length > 6) return false; // 한글 이름이 6자를 초과할 경우
    return true;
  }

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setPhone(value);

    if (!validatePhone(value)) {
      setPhoneError('핸드폰 번호는 11~12자리 숫자여야 합니다.');
    } else {
      setPhoneError('');
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);

    if (!validateName(value)) {
      setNameError('이름에 특수문자와 공백을 포함할 수 없으며, 한글 이름은 6자 이내여야 합니다.');
    } else {
      setNameError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      name,
      birth,
      phone,
      gender,
    };

    try {
      const response = await fetch('https://localhost:9092/join/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 성공적으로 처리된 경우
        console.log('회원가입 성공');
        // 필요한 작업 수행
        navigate("/");
      } else {
        throw new Error('회원가입 실패');
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
      // API 호출 실패 시 처리
    }
  };

  return (
    <BasicLayout>
      <div className="logingrid">
        <form onSubmit={handleSubmit}>
          <h4 className='LoginHeader'>추가정보를 입력해 주세요</h4>
          <div className="LoginMainBody" style={{display:'flex' ,flexDirection: 'column'}}>
            <div className='email'>
              <label htmlFor="email">이메일</label>
              <input
                placeholder={"Email"}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly // 수정 불가능하게 설정
              />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                placeholder={"Passwrod"}
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              {!passwordError && password && <FaCheckCircle style={{ color: 'green' }} />}
            </div>
            <div>
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                placeholder={"Passwrod"}
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
              {!confirmPasswordError && confirmPassword && <FaCheckCircle style={{ color: 'green' }} />}
            </div>
            <div>
              <label htmlFor="name">이름</label>
              <input
                placeholder={"Name"}
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
              {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
            </div>
            <div>
              <label htmlFor="birth">생년월일</label>
              <input
                type="date"
                id="birth"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">전화번호</label>
              <input
                placeholder={"Phone"}
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
            </div>
            <div style={{flexDirection: 'row'}}>
              <label>성별</label>
              <div style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  id="gender-male"
                  name="gender"
                  value="male"
                  checked={gender == 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label htmlFor="gender-male" defaultChecked>남성</label>
              </div>
              <div style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value="female"
                  checked={gender == 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label htmlFor="gender-female">여성</label>
              </div>
              <div style={{flexDirection: 'row'}}>
                <input
                  type="radio"
                  id="gender-other"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label htmlFor="gender-other">기타</label>
              </div>
            </div>
          </div>
          <button className='origin__btn' type="submit">회원가입</button>
        </form>
      </div>
    </BasicLayout>
  );
}
export default AdditionalForm;