import React from "react";

function MainCalendar({ currentData }) {
  return (
    <div className="main-calendar">
      <h2>メインカレンダー</h2>
      <p>現在の日付: {currentData}</p>
      {/*縦スクロール表示のロジック*/}
    </div>
  );
}

export default MainCalendar;
