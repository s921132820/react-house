import React, { useState } from 'react';
import user from '../data/user'; // user.js 파일 import
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 로그인 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // user.js의 데이터와 비교
    const currentUser = user.find(
      (u) => u.Username === username && u.password === password
    );

    if (currentUser) {
      onLogin(currentUser);  // 로그인 성공 시 부모 컴포넌트에 사용자 정보 전달
      navigate('/home'); // 로그인 후 홈 페이지로 이동
    } else {
      setErrorMessage('아이디 또는 비밀번호가 틀렸습니다.');
    }
  };

  const handleSignupRedirect = (e) => {
    e.preventDefault(); // form의 기본 동작 방지
    navigate('/signup'); // 회원가입 페이지로 이동
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {/* 회원가입 버튼 */}
        <button type="button" onClick={handleSignupRedirect}>Sign Up</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;