import React from "react";

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
  const isDateInSeason = (startDate, endDate, currentDate) => {
    const parseDate = (dateString) => {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const current = parseDate(currentDate.replace(/年|月/g, '-').replace('日', ''));

    const getMonthDay = (date) => date.getMonth() * 100 + date.getDate();
    const currentMonthDay = getMonthDay(current);
    const startMonthDay = getMonthDay(start);
    const endMonthDay = getMonthDay(end);

    // 年をまたがない場合
    if (startMonthDay <= endMonthDay) {
      return currentMonthDay >= startMonthDay && currentMonthDay <= endMonthDay;
    }
    // 年をまたぐ場合（例：11月1日から3月31日）
    else {
      return currentMonthDay >= startMonthDay || currentMonthDay <= endMonthDay;
    }
  };

  // 現在の日付に合う魚をフィルタリング
  const filteredFish = seasonalFish.filter((fish) =>
    fish.fish_seasons.some((season) => {
      const inSeason = isDateInSeason(season.start_date, season.end_date, currentDate);
      console.log(`Fish ${fish.name} in season:`, inSeason, {
        start: season.start_date,
        end: season.end_date,
        current: currentDate
      });
      return inSeason;
    })
  );

  console.log("Filtered seasonal fish:", filteredFish);


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
                {fish.image_url ? (
                  <img
                    src={`http://localhost:3000${fish.image_url}`}
                    alt={fish.name}
                    className="w-full h-32 object-cover mb-2 rounded-lg"
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
