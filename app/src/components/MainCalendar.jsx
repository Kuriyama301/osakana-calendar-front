import React, { useState, useEffect, useRef } from 'react';

const MainCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto scroll-smooth p-2">
        {calendarData.map((date, index) => {
          const { month, day, weekday } = formatDate(date);
          return (
            <div 
              key={index}
              className={`flex flex-col justify-start p-4 mb-2 bg-blue-500 rounded-lg text-white h-24 relative ${isToday(date) ? 'ring-2 ring-yellow-400' : ''}`}
              ref={isToday(date) ? todayRef : null}
            >
              <div className="text-sm tracking-widest mb-1">Date</div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold tracking-widest">{month}{day}</span>
                <span className="text-xl ml-2">{weekday}</span>
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
    </div>
  );
};

export default MainCalendar;