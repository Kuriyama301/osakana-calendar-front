import React, { useState, useEffect, useRef } from 'react';
import FishDetails from './FishDetails';

const fishIcons = [
  { id: 1, name: 'マゴチ', imageUrl: '/api/placeholder/100/100' },
  { id: 2, name: 'サンマ', imageUrl: '/api/placeholder/100/100' },
  { id: 3, name: 'サバ', imageUrl: '/api/placeholder/100/100' },
  { id: 4, name: 'タイ', imageUrl: '/api/placeholder/100/100' },
  { id: 5, name: 'アジ', imageUrl: '/api/placeholder/100/100' },
  { id: 6, name: 'イワシ', imageUrl: '/api/placeholder/100/100' },
  { id: 7, name: 'カツオ', imageUrl: '/api/placeholder/100/100' },
  { id: 8, name: 'ブリ', imageUrl: '/api/placeholder/100/100' },
  { id: 9, name: 'サケ', imageUrl: '/api/placeholder/100/100' },
];

const SeasonalFishModal = ({ isOpen, onClose, currentDate }) => {
  const [selectedFish, setSelectedFish] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const handleFishClick = (fish) => {
    setSelectedFish(fish);
  };

  if (!isOpen) return null;

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-600">旬の魚</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">{formatDate(currentDate)}</p>
        {selectedFish ? (
          <FishDetails fish={selectedFish} onBack={() => setSelectedFish(null)} />
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {fishIcons.map((fish) => (
              <div 
                key={fish.id} 
                className="aspect-square cursor-pointer"
                onClick={() => handleFishClick(fish)}
              >
                <img src={fish.imageUrl} alt={fish.name} className="w-full h-full object-cover rounded" />
                <p className="text-center mt-2">{fish.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonalFishModal;