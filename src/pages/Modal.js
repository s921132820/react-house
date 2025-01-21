import React from "react";

function Modal({ title, image, content, price, bad, onClose }) {
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title} <span><button onClick={onClose}>Close</button></span></h2>
        
        <img src={image} alt={title} width="80%" />
        <p>{content}</p>
        <p>{price} 원</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  );
}

export default Modal;