import React, { useState, useEffect, useRef } from 'react';
import SeasonalFishModal from './SeasonalFishModal';
import calendarBackgroundSvg from '@/assets/calendar-background.svg';

const MainCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const todayRef = useRef(null);

  useEffect(() => {
    generateCalendarData(new Date());
  }, []);

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }, [calendarData]);

  const generateCalendarData = (centerDate) => {
    const data = [];
    const start = new Date(centerDate);
    start.setFullYear(start.getFullYear() - 1);
    
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 2);
    
    for (let date = new Date(start); date < end; date.setDate(date.getDate() + 1)) {
      data.push(new Date(date));
    }
  
    setCalendarData(data);
  };

  const formatDate = (date) => {
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    return {
      month: String(date.getMonth() + 1).padStart(2, '0'),
      day: String(date.getDate()).padStart(2, '0'),
      weekday: days[date.getDay()]
    };
  };

  const isToday = (date) => date.toDateString() === new Date().toDateString();

  const handleDateClick = (date) => {
    setSelectedDate(`${date.getFullYear()}年${formatDate(date).month}月${formatDate(date).day}日`);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto scroll-smooth p-2">
        {calendarData.map((date, index) => {
          const { month, day, weekday } = formatDate(date);
          return (
            <div 
              key={index}
              className={`flex flex-col justify-start p-4 mb-2 rounded-lg text-white h-24 relative ${
                isToday(date) ? 'ring-2 ring-yellow-400' : ''
              } cursor-pointer`}
              style={{
                backgroundImage: `url(${calendarBackgroundSvg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              ref={isToday(date) ? todayRef : null}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-sm tracking-widest mb-1 text-white">Date</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold tracking-widest text-white">{month}{day}</span>
                <span className="text-xl ml-2 text-white">{weekday}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => generateCalendarData(new Date())}
        >
          <span className="transform rotate-180 inline-block">↻</span>
        </button>
      </div>
      <SeasonalFishModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        currentDate={selectedDate}
      />
    </div>
  );
};

export default MainCalendar;