import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Modal from "./component/Modal";
import data from "./data/oneroom";
import List from "./component/List"
import { asc, desc } from './component/common'

function App() {


  return (
    
    <div className="App">
      <div className="container">
      {/* 메뉴영역 */}
      <header className="Menu-wrap">
        {
        menus.map(function(x, index) {
          return (
            <div className="item">
              <a href="#">{menus[index]}</a>
          </div>
          )
        })
        }
      </header>
      <div>
        <button onClick={()=>asc(rooms, setRooms)}>오름차순</button>
        <button onClick={()=>desc(rooms, setRooms)}>내림차순</button>
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
              // content = {item.content}
              price = {room.price}
              bad = {room.bad}
              id={room.id}
              showModal={showModal}
              setShowModal={setShowModal}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              onClick={() => handleClick(room.id)}
              />
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
          )
        })
      }
      {/* 리스트 끝 */}


      </div>
    </div>
  );
}

export default App;
