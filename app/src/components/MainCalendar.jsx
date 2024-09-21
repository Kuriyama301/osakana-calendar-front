import React, { useState, useEffect, useRef } from 'react';
import './MainCalendar.css';

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
    <div className="main-calendar">
      <div className="calendar-container">
        {calendarData.map((date, index) => {
          const { month, day, weekday } = formatDate(date);
          return (
            <div 
              key={index}
              className={`calendar-day ${isToday(date) ? 'today' : ''}`}
              ref={isToday(date) ? todayRef : null}
            >
              <div className="date-container">
                <div className="date-label">Date</div>
                <div className="date">
                  <span className="date-month-day">{month}{day}</span>
                  <span className="date-weekday">{weekday}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="calendar-footer">
        <button className="refresh-button" onClick={() => generateCalendarData(new Date())}>
          <span className="refresh-icon">↻</span>
        </button>
      </div>
    </div>
  );
};

export default MainCalendar;