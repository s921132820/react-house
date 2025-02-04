import React, { useState } from "react";
import Modal from "../Modal";
import { asc, desc, ascByPrice, descByPrice } from '../../component/common';

function OneroomPage({ onerooms, setOnerooms, showModal, setShowModal, selectedIndex, setSelectedIndex, handleFavorite, favoriteItems }) {
  const [favoriteOneroomments, setFavoriteOneroomments] = useState([]);

  // 버튼의 텍스트를 동적으로 변경하기 위한 함수
  const isFavorite = (oneroomId) => {
    return favoriteItems.some(item => item.id === oneroomId && item.type === 'oneroom');
  };

  return (
    <div className="list-wrap"  style={{display:'flex'}}>
      <div className="container-50">
        <div>
          <span>이름순</span>
          <button onClick={() => asc(onerooms, setOnerooms)}>▲</button>
          <button onClick={() => desc(onerooms, setOnerooms)}>▼</button>
        </div>
        <div>
          <span>가격순</span>
          <button onClick={() => ascByPrice(onerooms, setOnerooms)}>▲</button>
          <button onClick={() => descByPrice(onerooms, setOnerooms)}>▼</button>
        </div>
        <div className="room-list">
          {onerooms.map((room) => (
            <div key={room.id} className="list-item" onClick={() => {
              if (showModal && selectedIndex === room.id) {
                setShowModal(false);
                setSelectedIndex(null);
              } else {
                setSelectedIndex(room.id);
                setShowModal(true);
              }
            }}>
              <div className="list-thumb">
                <img src={room.image} alt="room" />
              </div>
              <div>
                <h4>{room.title}</h4>
                <p>{room.content}</p>
                <p>{room.price} 원</p>
                <p>허위매물신고: {room.bad}</p>
                <a onClick={() => handleFavorite(room.id, 'oneroom')}>
                  {isFavorite(room.id) ? '♥ 찜취소' : '♡ 찜하기'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-50">
        {/* 상세페이지 시작 */}
        {showModal && selectedIndex !== null && (
          <Modal
            title={onerooms[selectedIndex].title}
            image={onerooms[selectedIndex].image}
            content={onerooms[selectedIndex].content}
            price={onerooms[selectedIndex].price}
            bad={onerooms[selectedIndex].bad}
            onClose={() => setShowModal(false)}
          />
        )}
        {/* 상세페이지 종료 */}
      </div>
    </div>
  );
}

export default OneroomPage;
