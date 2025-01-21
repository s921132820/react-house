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



  export { asc, desc };