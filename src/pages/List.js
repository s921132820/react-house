import React from "react";

function List(props) {
  let { title, image, content, price, bad, id, showModal, setShowModal, selectedIndex, setSelectedIndex } = props;

  return (
    <div className="list"  onClick={()=> {
                if (showModal && selectedIndex === id) {
                  setShowModal(false);
                  setSelectedIndex(null);
                } else {
                  setSelectedIndex(id);
                  setShowModal(true);
                }
              }}>
      <h4>{title}</h4>
      <img src={image} width="80%" alt="room" />
      <p>{content}</p>
      <p>{price} 원</p>
      <p>허위매물신고: {bad}</p>
    </div>
  );
}

export default List;