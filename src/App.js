import { useState } from 'react';
import './App.css';
import data from "./data/oneroom";
import Modal from "./pages/Modal";
import List from "./pages/List";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { asc, desc } from './component/common';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';


function App() {
  let [menus, setMenus] = useState(['Home', 'Shop', 'About']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [rooms, setRooms] = useState(data);
  // const navigate = useNavigate();

  // Modal 스테이트 생성
  let [showModal, setShowModal] =useState(false);
  let [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  // 로그인 관련
  const handleLogin = (user) => {
    setUserInfo(user);  // 로그인 성공 시 사용자 정보를 저장
    setIsLoggedIn(true); // 로그인 상태를 true로 설정
  };

  if (!isLoggedIn) {
    return (
    // return <Login onLogin={handleLogin} />; // 로그인하지 않았으면 Login 화면을 보여줌
    <Router> {/* BrowserRouter로 감싸기 */}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* 기본 경로는 로그인 페이지 */}
        <Route path="/home" element={<div>Home Page</div>} /> 
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
    )
  }

  return (
    <div className="App">
      <div className="container">
      {/* 메뉴영역 */}
      <header className="Menu-wrap">
        {
        menus.map(function(x, index) {
          return (
            <div className="item" key={index}>
              <a href="#">{menus[index]}</a>
          </div>
          )
        })
        }
      </header>
      <div>
        <button onClick={()=>asc(rooms, setRooms)}>오름차순</button>
        <button onClick={()=>desc(rooms, setRooms)}>내림차순</button>
        <button onClick={()=>setIsLoggedIn(false)}>로그아웃</button>
      </div>
      {/* 메뉴영역 끝 */}

      {/* 리스트 시작*/}
      {
        rooms.map((room) => {
          return(
            <div key={room.id} className="list-wrap">
              <List 
              title = {room.title}
              image = {room.image}
              price = {room.price}
              bad = {room.bad}
              id={room.id}
              showModal={showModal}
              setShowModal={setShowModal}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              onClick={() => handleClick(room.id)}
              />

            </div>
          )
        })
      }
      {/* 리스트 끝 */}

      {/* 상세페이지 시작 */}
      {showModal && selectedIndex !== null && (
        <Modal
          title={data[selectedIndex].title}
          image={data[selectedIndex].image}
          content={data[selectedIndex].content}
          price={data[selectedIndex].price}
          bad={data[selectedIndex].bad}
          onClose={() => setShowModal(false)} // 모달 닫기 핸들러
        />
      )}
      {/* 상세페이지 종료 */}
      </div>
    </div>
  );
}

export default App;
