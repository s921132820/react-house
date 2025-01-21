import React, { useState } from 'react';
import user from '../data/user'; // user.js에서 데이터를 불러옵니다.
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // 회원가입 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 중복된 id가 있는지 확인
    const userExists = user.find((u) => u.Username === id);

    if (userExists) {
      setErrorMessage('이미 사용 중인 아이디입니다.');
      return;
    }

    // 새로운 사용자 데이터 추가
    const newUser = {
      Username: id,
      password,
      nickname,
      email,
      telNumber,
    };

    // 배열에 새로운 사용자 추가
    user.push(newUser);

    // 회원가입 후 로그인 페이지로 리다이렉트
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={telNumber}
          onChange={(e) => setTelNumber(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;