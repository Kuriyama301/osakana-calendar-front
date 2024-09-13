import React from 'react';
import MainCalendar from '../components/MainCalendar';
import SeasonalFishButton from '../components/SeasonalFishButton';

function HomePage() {
  const handleSeasonalFishClick = () => {
    console.log('旬の魚ボタンがクリックされました');
    // ここに旬の魚モーダルを開く処理を追加します
  };

  return (
    <div className="home-page">
      <h1>オサカナカレンダー</h1>
      <MainCalendar />
      <SeasonalFishButton onClick={handleSeasonalFishClick} date="2023-09-14" />
    </div>
  );
}

export default HomePage;