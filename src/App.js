import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Modal from "./Modal";

function App() {
  let [menus, setMenus] = useState(['Home', 'Shop', 'About']);
  let [prices, setPrices] = useState([50, 55, 70]);
  let [products, setProduct] = useState(['역삼동원룸', '천호동원룸', '마포구원룸']);
  let [content, setContent] = useState ([ 
    '침실만 따로 있는 공용 셰어하우스입니다. 최대 2인 가능',
    '2층 원룸입니다. 비올 때 물 가끔 들어오는거 빼면 좋아요',
    '살기 좋아요. 주변에 편의점 10개 넘어요.'
  ])

  let [reportCount, setReportCount] = useState([0, 0, 0])

  function addReport(num) {
    let copyReport = [... reportCount];
    copyReport[num] += 1;
    setReportCount([... copyReport])
  }

    // Modal 스테이트 생성
    let [showModal, setShowModal] =useState(false);
    let [selectedIndex, setSelectedIndex] = useState(null);

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
      {/* 메뉴영역 끝 */}

      {/* 리스트 시작*/}
      {
        products.map(function(x, index) {
          return (
          // 리스트시작
          <div className="list" key={index}>
            <h4 
              onClick={()=> {
                if (showModal && selectedIndex === index) {
                  setShowModal(false);
                  setSelectedIndex(null);
                } else {
                  setSelectedIndex(index);
                  setShowModal(true);
                }
              }}
              >
              {products[index]}
            </h4>
            <span className="report" onClick = {() => {addReport(index)}}> ☎ 허위매물신고</span>
            <span className="reportCount">{reportCount[index]}</span>
            <p>{prices[index]}</p>
          </div>
          // 리스트 종료
          )
        })
      }
      {/* 리스트 끝 */}

      {/* 상세페이지 시작 */}
      {showModal && selectedIndex !== null && (
        <Modal
          products={products[selectedIndex]}
          prices={prices[selectedIndex]}
          content={content[selectedIndex]}
        />
      )}
      {/* 상세페이지 종료 */}
      </div>
    </div>
  );
}

export default App;
