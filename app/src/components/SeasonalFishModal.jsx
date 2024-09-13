import React from "react";
import FishIcon from "./FishIcon";

function SeasonalFishModel({ isOpen, inClose, fishList }) {
  if (!isOpen) return null;

  return (
    <div className="sesonal-fish-model">
      <h3>旬の魚</h3>
      <div className="fish-grid">
        {fishList.map((fish) => (
          <FishIcon key={fish.id} fish={fish} />
        ))}
      </div>
      <button onClick={onclose}>閉じる</button>
    </div>
  );
}

export default SeasonalFishModel;
