import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import SeasonTerm from './SeasonTerm';
import FishDetails from './FishDetails';

const SeasonalFishModal = ({
  isOpen,
  onClose,
  currentDate,
  seasonalFish,
  isLoading,
  error,
}) => {
  const [selectedFish, setSelectedFish] = useState(null);
  const [isFishDetailsOpen, setIsFishDetailsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleFishClick = (fish) => {
    setSelectedFish(fish);
    setIsFishDetailsOpen(true);
  };

  const handleCloseSeasonalFishModal = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const filteredFish = seasonalFish;

  if (!isAnimating && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${
        isAnimating && isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
      } flex items-center justify-center z-50`}
      onClick={handleCloseSeasonalFishModal}
    >
      <div 
        className={`bg-white rounded-lg text-gray-800 relative w-full mx-4 sm:mx-8 md:mx-auto md:max-w-2xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out ${
          isAnimating && isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 pr-8 sm:pr-12">
            {currentDate}の旬の魚
          </h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 bg-white hover:bg-gray-300 hover:text-gray-800 rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6">
          {isLoading ? (
            <p className="text-gray-800">データを読み込み中...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredFish.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {filteredFish.map((fish) => (
                <div 
                  key={fish.id} 
                  className="flex flex-col items-center justify-center text-center cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => handleFishClick(fish)}
                >
                  {fish.image_url ? (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-2">
                      <img 
                        src={fish.image_url}
                        alt={fish.name} 
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onError={(e) => {
                          console.error(`Failed to load image for ${fish.name}:`, e);
                          e.target.src = '/path/to/fallback/image.jpg'; // フォールバック画像のパスを指定
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 flex items-center justify-center mb-2 rounded-lg text-gray-800">
                      画像なし
                    </div>
                  )}
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{fish.name}</p>
                  {fish.fish_seasons && fish.fish_seasons.length > 0 ? (
                    fish.fish_seasons.map((season, index) => (
                      <SeasonTerm key={index} season={season} />
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">シーズン情報なし</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-800">この日付の旬の魚はありません。</p>
          )}
        </div>
      </div>

      <FishDetails
        isOpen={isFishDetailsOpen}
        onClose={() => setIsFishDetailsOpen(false)}
        fish={selectedFish}
      />
    </div>
  );
};

export default SeasonalFishModal;