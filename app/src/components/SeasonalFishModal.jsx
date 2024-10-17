import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const SeasonalFishModal = ({
  isOpen,
  onClose,
  currentDate,
  seasonalFish,
  isLoading,
  error,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300); // アニメーション時間と合わせる
    }
  }, [isOpen]);

  console.log("Rendering SeasonalFishModal", {
    isOpen,
    currentDate,
    seasonalFish,
    isLoading,
    error,
  });

  if (!isOpen) return null;

  // 日付の比較関数
  const isDateInSeason = (season, currentDate) => {
    const [year, month, day] = currentDate.replace(/年|月/g, '-').replace('日', '').split('-').map(Number);
    const current = new Date(year, month - 1, day);
    const currentMonthDay = current.getMonth() * 100 + current.getDate();

    const startMonthDay = (season.start_month - 1) * 100 + season.start_day;
    const endMonthDay = (season.end_month - 1) * 100 + season.end_day;

    const result = startMonthDay <= endMonthDay
      ? currentMonthDay >= startMonthDay && currentMonthDay <= endMonthDay
      : currentMonthDay >= startMonthDay || currentMonthDay <= endMonthDay;

    console.log('isDateInSeason', { season, currentDate, currentMonthDay, startMonthDay, endMonthDay, result });

    return result;
  };

  // 現在の日付に合う魚をフィルタリング
  const filteredFish = seasonalFish.filter((fish) =>
    fish.fish_seasons.some((season) => {
      const inSeason = isDateInSeason(season, currentDate);
      console.log(`Fish ${fish.name} in season:`, inSeason, {
        start: `${season.start_month}/${season.start_day}`,
        end: `${season.end_month}/${season.end_day}`,
        current: currentDate
      });
      return inSeason;
    })
  );

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300); // アニメーション時間と合わせる
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  console.log("Filtered seasonal fish:", filteredFish);
  console.log('Fish data:', JSON.stringify(filteredFish, null, 2));

  return (
    <div 
      className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-300 ${
        isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-lg text-gray-800 relative transition-all duration-300 
          w-full mx-4 sm:mx-8 md:mx-auto md:max-w-2xl 
          max-h-[90vh] flex flex-col overflow-hidden
          ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={handleModalClick}
      >
        {/* ヘッダー部分 */}
        <div className="sticky top-0 bg-white z-10 p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 pr-8 sm:pr-12">
            {currentDate}の旬の魚
          </h2>
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-600 bg-white hover:bg-gray-300 hover:text-gray-800 rounded-full p-2 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
  
        {/* スクロール可能なコンテンツ部分 */}
        <div className="flex-grow overflow-y-auto scrollbar-hide p-4 sm:p-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {isLoading ? (
            <p className="text-gray-800">データを読み込み中...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredFish.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 px-0">
              {filteredFish.map((fish) => (
                <div key={fish.id} className="flex flex-col items-center justify-center text-center">
                  {fish.image_url ? (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center mb-2">
                      <img 
                        src={fish.image_url}
                        alt={fish.name} 
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onError={(e) => {
                          console.error(`Failed to load image for ${fish.name}:`, e);
                          e.target.src = 'path/to/fallback/image.jpg';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gray-200 flex items-center justify-center mb-2 rounded-lg text-gray-800">
                      画像なし
                    </div>
                  )}
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">{fish.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-800">この日付の旬の魚はありません。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonalFishModal;
