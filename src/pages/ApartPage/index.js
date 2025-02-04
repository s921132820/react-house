import React, { useState } from "react";
import Modal from "../Modal";
import { asc, desc, ascByPrice, descByPrice } from '../../component/common';

function ApartPage({ aparts, setAparts, showModal, setShowModal, selectedIndex, setSelectedIndex, handleFavorite, favoriteItems }) {
  const [favoriteApartments, setFavoriteApartments] = useState([]);

  // 버튼의 텍스트를 동적으로 변경하기 위한 함수
  const isFavorite = (apartId) => {
    return favoriteItems.some(item => item.id === apartId && item.type === 'apart');
  };

  return (
    <div className="list-wrap" style={{display:'flex'}}>
      <div className="container-50">
        <div>
          <span>이름순</span>
          <button onClick={()=>asc(aparts, setAparts)}>▲</button>
          <button onClick={()=>desc(aparts, setAparts)}>▼</button>
        </div>
        <div>
          <span>가격순</span>
          <button onClick={()=>ascByPrice(aparts, setAparts)}>▲</button>
          <button onClick={()=>descByPrice(aparts, setAparts)}>▼</button>
        </div>
        <div className="room-list">
          {aparts.map((apart) => (
            <div key={apart.id} className="list-item" onClick={() => {
              if (showModal && selectedIndex === apart.id) {
                setShowModal(false);
                setSelectedIndex(null);
              } else {
                setSelectedIndex(apart.id);
                setShowModal(true);
              }
            }}>
              <div className="list-thumb">
                <img src={apart.image} alt="room" />
              </div>
              <div>
                <h4>{apart.title}</h4>
                <p>{apart.content}</p>
                <p>{apart.price} 원</p>
                <p>허위매물신고: {apart.bad}</p>
                <a onClick={() => handleFavorite(apart.id, 'apart')}>
                  {isFavorite(apart.id) ? '♥' : '♡'}
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
            title={aparts[selectedIndex].title}
            image={aparts[selectedIndex].image}
            content={aparts[selectedIndex].content}
            price={aparts[selectedIndex].price}
            bad={aparts[selectedIndex].bad}
            onClose={() => setShowModal(false)}
          />
        )}
        {/* 상세페이지 종료 */}
      </div>
    </div>
  );
}

export default ApartPage;
