import { useState, useEffect } from 'react';
import './App.css';
import oneroomData from "./data/oneroom";
import apartData from "./data/apart";
// import Login from "./pagees/Signup";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import MainPage from './pages/MainPage';
import OneroomPage from './pages/OneroomPage';
import ApartPage from './pages/ApartPage';
import FavoritePage from './pages/FavoritePage';

function App() {
  // let [menus, setMenus] = useState(['Home', 'Shop', 'About']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [onerooms, setOnerooms] = useState(oneroomData);
  const [aparts, setAparts] = useState(apartData);
  const [favoriteItems, setFavoriteItems] = useState([]);  // 찜 목록을 원룸과 아파트 통합하여 관리
  const navigate = useNavigate();

  

  // Modal 스테이트 생성
  // 원룸 모달 상태
  const [showModalOneroom, setShowModalOneroom] = useState(false);
  const [selectedIndexOneroom, setSelectedIndexOneroom] = useState(null);

  // 아파트 모달 상태
  const [showModalApart, setShowModalApart] = useState(false);
  const [selectedIndexApart, setSelectedIndexApart] = useState(null);

  const handleClick = (index) => {
    setSelectedIndexOneroom(index);
    setShowModalOneroom(true);
  };

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleFavorite = (itemId, type) => {
    setFavoriteItems((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(item => item.id === itemId && item.type === type);
      
      // 해당 아이템을 찜 목록에서 제거하거나 추가
      if (isAlreadyFavorite) {
        return prevFavorites.filter(item => item.id !== itemId || item.type !== type); // 찜 목록에서 제거
      } else {
        // 찜 목록에 추가할 때, 아이템의 정보도 함께 저장
        const item = type === 'apart' 
          ? aparts.find(apart => apart.id === itemId) 
          : onerooms.find(oneroom => oneroom.id === itemId);
  
        // 아이템 정보가 없다면 빈 객체를 반환하도록 방어 코드 추가
        if (!item) return prevFavorites;
  
        return [...prevFavorites, { 
          id: itemId, 
          type, 
          title: item.title, 
          price: item.price, 
          image: item.image, 
          content: item.content, 
          bad: item.bad // 필요한 데이터 추가
        }];
      }
    });
  };
  // 구글 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setIsLoggedIn(true);
        console.log("====login success : ", user);
      } else {
        setUserInfo(null);
        setIsLoggedIn(false);
        // console.log("====logout success : ", user);
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [auth]);

  // 로그인 기능
  const firebaseLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserInfo(user);
        setIsLoggedIn(true);
        console.log("Login successful", userInfo.photoURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 로그아웃 기능
  const firebaseLogout = () => {
    signOut(auth)
      .then(() => {
        setUserInfo(null);
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="App">
      <div className="container">
        {/* 메뉴영역 */}
        <header className="Menu-wrap">
          <div>
            <a onClick={()=>navigate("/")} className="logo">부동산</a>
            <a onClick={()=>navigate("/")}>홈</a>
            <a onClick={()=>navigate("/oneroom")}>원룸</a>
            <a onClick={()=>navigate("/apart")}>아파트</a>
            {
              isLoggedIn && (
              <a onClick={() => navigate("/favorite")}>찜목록</a>
            )}
          </div>
          <div className="login">
            {
              userInfo === null ?
              <a onClick={firebaseLogin}>Login</a> :
              (
              <div className='userInfoArea'>
                <span>{userInfo.displayName}</span>
                <img src={userInfo.photoURL} className='userImage'></img>
                <a onClick={firebaseLogout}>Logout</a>
              </div>
            )}
          </div>
        </header>
        {/* 메뉴영역 끝 */}
      </div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/oneroom" element={<OneroomPage 
          onerooms = {onerooms}
          setOnerooms={setOnerooms}
          showModal={showModalOneroom}
          setShowModal={setShowModalOneroom}
          selectedIndex={selectedIndexOneroom}
          setSelectedIndex={setSelectedIndexOneroom}
          handleFavorite={handleFavorite}
          favoriteItems={favoriteItems}
        />} />
        <Route path="/apart" element={<ApartPage 
          aparts = {aparts}
          setAparts={setAparts}
          showModal={showModalApart}
          setShowModal={setShowModalApart}
          selectedIndex={selectedIndexApart}
          setSelectedIndex={setSelectedIndexApart}
          handleFavorite={handleFavorite}
          favoriteItems={favoriteItems}
        />} />
        <Route path="/favorite" element={<FavoritePage 
          favoriteItems={favoriteItems}
          setFavoriteItems = {setFavoriteItems}
        />} />
      </Routes>
    </div>
  );
}

export default App;
