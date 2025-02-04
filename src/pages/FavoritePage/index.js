import React from 'react';


function FavoritedPage({ favoriteItems, setFavoriteItems }) {
  console.log("=======", favoriteItems); // favoriteItems 값을 확인

  // 찜 삭제
  const handleRemoveFavorite = (itemId) => {
    setFavoriteItems((prevFavorites) => 
      prevFavorites.filter(item => item.id !== itemId)
    );
  };

  return (
    <div className="list-wrap">
      <h2>찜한 목록</h2>
      {favoriteItems.length === 0 ? (
        <p>찜한 항목이 없습니다.</p>
      ) : (
        <div className="room-list">
          {favoriteItems.map((item) => (
            <div key={item.id} className="list-item">
              <div className="list-thumb">
                <img src={item.image} alt={item.title} />
              </div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.price} 원</p>
                <p>{item.content}</p>
                <p>허위매물신고: {item.bad}</p>
                {item.type === 'apart' ? (
                  <p>아파트 아이템</p>
                ) : (
                  <p>원룸 아이템</p>
                )}
                <button onClick={() => handleRemoveFavorite(item.id)}>찜 삭제</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritedPage;
