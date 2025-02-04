import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return(
    <div class="container">
      <div className="manu-box" onClick={()=>navigate("/oneroom")}>
        <h2>원/투룸</h2>
        <p>주택/빌라, 오피스텔, 아파트까지<br />
        모~든 전월세 매물을 한번에!</p>
      </div>
      <div className="manu-box" onClick={()=>navigate("/apart")}>
        <h2>아파트</h2>
        <p>가장 빠른 실거래가 알림!<br />
        풍부한 단지정보 및 실시간 랭킹까지!</p>
      </div>
    </div>
  )
}

export default MainPage;