import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import SeasonTerm from './SeasonTerm';

const FishDetails = ({ isOpen, onClose, fish }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
        isAnimating && isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
      } flex items-center justify-center z-50`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-lg text-gray-800 relative w-full mx-4 sm:mx-8 md:mx-auto md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out ${
          isAnimating && isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            {fish?.name}
          </h2>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 bg-white hover:bg-gray-300 hover:text-gray-800 rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6">
          <div className="flex flex-col items-center">
            {fish?.image_url ? (
              <img 
                src={fish.image_url}
                alt={fish.name} 
                className="w-full max-w-md h-auto object-contain rounded-lg mb-6"
                onError={(e) => {
                  console.error(`Failed to load image for ${fish.name}:`, e);
                  e.target.src = '/path/to/fallback/image.jpg'; // フォールバック画像のパスを指定
                }}
              />
            ) : (
              <div className="w-full max-w-md h-48 bg-gray-200 flex items-center justify-center rounded-lg text-gray-800 mb-6">
                画像なし
              </div>
            )}
            
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-2">旬の季節</h3>
              {fish?.fish_seasons && fish.fish_seasons.length > 0 ? (
                fish.fish_seasons.map((season, index) => (
                  <SeasonTerm key={index} season={season} />
                ))
              ) : (
                <p className="text-lg text-gray-700 mb-4">シーズン情報なし</p>
              )}
              
              <h3 className="text-xl font-semibold mb-2 mt-6">原産地</h3>
              <p className="text-lg text-gray-700 mb-4">{fish?.origin}</p>
              
              <h3 className="text-xl font-semibold mb-2">栄養</h3>
              <p className="text-lg text-gray-700 mb-4">{fish?.nutrition}</p>
              
              <h3 className="text-xl font-semibold mb-2">特徴</h3>
              <p className="text-lg text-gray-700">{fish?.features}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishDetails;