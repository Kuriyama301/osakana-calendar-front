import React from "react";

function FishIcon({ fish, onClock }) {
  return (
    <div className="fish-icon" onClick={() => onClick(fish)}>
      <img src={fish.iconUrl} alt={fish.name} />
      <p>{fish.name}</p>
    </div>
  );
}

export default FishIcon;
