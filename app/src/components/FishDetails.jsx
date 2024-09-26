import React from 'react';

const FishDetails = ({ fish, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-500 hover:text-blue-700">Back</button>
      <img src={fish.imageUrl} alt={fish.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h3 className="text-2xl font-bold mb-2">{fish.name}</h3>
      <p className="text-gray-700 mb-4">魚の説明がここに入ります。</p>
      {/* 必要に応じて他の詳細情報を追加 */}
    </div>
  );
};

export default FishDetails;