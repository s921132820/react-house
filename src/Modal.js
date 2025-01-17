function Modal(x) {
  return(
    <div className="modal">
      <h4>{x.products}</h4>
      <p>가격 : {x.prices}0,000원</p>
      <p>{x.content}</p>
    </div>
  )
}

export default Modal;