import React from 'react';

function SeasonalFishButton({ onClick, date }) {
  // onClickがpropsとして渡されていない場合のデフォルト処理
  const handleClick = onClick || (() => console.log('旬の魚ボタンがクリックされました'));

  return (
    <button className="seasonal-fish-button" onClick={handleClick}>
      {date ? `${date}の旬の魚を見る` : '旬の魚を見る'}
    </button>
  );
}

export default SeasonalFishButton;