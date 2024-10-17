import React from "react";

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);

const SeasonalFishModal = ({
  isOpen,
  onClose,
  currentDate,
  seasonalFish,
  isLoading,
  error,
}) => {
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

  console.log("Filtered seasonal fish:", filteredFish);
  console.log('Fish data:', JSON.stringify(filteredFish, null, 2));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {currentDate}の旬の魚
        </h2>
        {isLoading ? (
          <p className="text-gray-800">データを読み込み中...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredFish.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredFish.map((fish) => (
              <div key={fish.id} className="text-center">
                {console.log('Fish image_url:', fish.image_url)}
                {fish.image_url ? (
                  <img 
                    src={`${import.meta.env.VITE_API_URL}${fish.image_url}`} 
                    alt={fish.name} 
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2 rounded-lg text-gray-800">
                    画像なし
                  </div>
                )}
                <p className="font-semibold text-gray-800">{fish.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-800">この日付の旬の魚はありません。</p>
        )}
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SeasonalFishModal;
