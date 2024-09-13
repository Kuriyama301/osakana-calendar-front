import React from "react";

function FishDetailModal({ fish, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fish-detail-modal">
      <h3>{fish.name}</h3>
      <img src={fish.imageUrl} alt={fish.name} />
      <p>{fish.description}</p>
      {/* ここにYouTube動画の埋め込みコードを追加 */}
      <button onClick={onClose}>閉じる</button>
    </div>
  );
}

export default FishDetailModal;
