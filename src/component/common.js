import React from "react";

  // 오름차순 정렬 함수
  const asc = (rooms, setRooms) => {
    const sortedRooms = [...rooms].sort((a, b) => a.title.localeCompare(b.title));
    setRooms(sortedRooms);
  };

  // 내림차순 정렬 함수
  const desc = (rooms, setRooms) => {
    const sortedRooms = [...rooms].sort((a, b) => b.title.localeCompare(a.title));
    setRooms(sortedRooms);
  };

  // 가격 오름차순 정렬 함수
const ascByPrice = (arr, setArr) => {
  const sorted = [...arr].sort((a, b) => a.price - b.price); // price 기준으로 오름차순
  setArr(sorted);
};

// 가격 내림차순 정렬 함수
const descByPrice = (arr, setArr) => {
  const sorted = [...arr].sort((a, b) => b.price - a.price); // price 기준으로 내림차순
  setArr(sorted);
};


  export { asc, desc, ascByPrice, descByPrice };