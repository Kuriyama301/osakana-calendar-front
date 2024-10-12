import React, { useState, useRef, useEffect, useImperativeHandle, useCallback } from 'react';
import { useCalendar } from '../CalendarContext';
import SeasonalFishModal from './SeasonalFishModal';

const MainCalendar = React.forwardRef((props, ref) => {
  const { selectedDate, mainCalendarRef, isExternalSelection } = useCalendar();
  const [calendarData, setCalendarData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModalDate, setSelectedModalDate] = useState('');
  const calendarRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToDate = useCallback((date) => {
    const targetElement = document.getElementById(`date-${date.toISOString()}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  useImperativeHandle(ref, () => ({
    scrollToDate
  }));

  useEffect(() => {
    if (mainCalendarRef) {
      mainCalendarRef.current = { scrollToDate };
    }
  }, [mainCalendarRef, scrollToDate]);

  const generateCalendarData = useCallback((startDate, endDate) => {
    const data = [];
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      data.push(new Date(date));
    }
    return data;
  }, []);

  useEffect(() => {
    const initialStartDate = new Date(new Date().getFullYear() - 5, 0, 1);
    const initialEndDate = new Date(new Date().getFullYear() + 5, 11, 31);
    setCalendarData(generateCalendarData(initialStartDate, initialEndDate));
  }, [generateCalendarData]);

  useEffect(() => {
    if (isExternalSelection) {
      scrollToDate(selectedDate);
    }
  }, [selectedDate, isExternalSelection, scrollToDate]);

  useEffect(() => {
    if (calendarRef.current && calendarData.length > 0) {
      const todayElement = calendarRef.current.querySelector('.today');
      if (todayElement) {
        todayElement.scrollIntoView({ behavior: 'auto', block: 'center' });
      }
    }
  }, [calendarData]);

  const handleScroll = useCallback(() => {
    if (isLoading || !calendarRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = calendarRef.current;
    const isNearTop = scrollTop < clientHeight;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < clientHeight;

    if (isNearTop || isNearBottom) {
      setIsLoading(true);
      const currentStartDate = calendarData[0];
      const currentEndDate = calendarData[calendarData.length - 1];

      let newData;
      if (isNearTop) {
        const newStartDate = new Date(currentStartDate);
        newStartDate.setFullYear(newStartDate.getFullYear() - 1);
        newData = generateCalendarData(newStartDate, currentStartDate);
        setCalendarData(prevData => [...newData, ...prevData]);
      } else {
        const newEndDate = new Date(currentEndDate);
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        newData = generateCalendarData(currentEndDate, newEndDate);
        setCalendarData(prevData => [...prevData, ...newData]);
      }

      setIsLoading(false);
    }
  }, [isLoading, calendarData, generateCalendarData]);

  useEffect(() => {
    const currentRef = calendarRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

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
    setSelectedModalDate(`${date.getFullYear()}年${formatDate(date).month}月${formatDate(date).day}日`);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 pt-16">
      <div ref={calendarRef} className="flex-grow overflow-y-auto scrollbar-hide">
        {calendarData.map((date, index) => {
          const { month, day, weekday } = formatDate(date);
          return (
            <div 
              key={index}
              id={`date-${date.toISOString()}`}
              className={`flex flex-col justify-start p-4 mb-2 rounded-lg text-white h-24 relative ${
                isToday(date) ? 'ring-2 ring-yellow-400 today' : ''
              } cursor-pointer`}
              style={{
                backgroundImage: `url(/calendar-background.svg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-sm tracking-widest mb-1 text-white">Date</div>
              <div className="flex items-baseline translate-y-[12px]">
                <span className="inline-flex justify-center w-24 text-5xl font-bold tracking-widest text-white relative -top-3 font-mono">
                  <span className="w-12 text-right">{month}</span>
                  <span className="w-12 text-left translate-x-[20px]">{day}</span>
                </span>
                <span className="text-3xl ml-2 text-white relative -top-3.5 translate-x-[40px]">
                  {weekday}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <SeasonalFishModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        currentDate={selectedModalDate}
      />
    </div>
  );
});

export default MainCalendar;