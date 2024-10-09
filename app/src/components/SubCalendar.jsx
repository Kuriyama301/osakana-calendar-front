import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../CalendarContext.jsx';

const SubCalendar = () => {
  const { selectedDate, setSelectedDateExternal, displayedMonth, changeDisplayedMonth } = useCalendar();

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = displayedMonth.getFullYear();
    const month = displayedMonth.getMonth();
    const days = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="text-center"></div>);
    }
    for (let i = 1; i <= days; i++) {
      const currentDate = new Date(year, month, i);
      const isSelected = currentDate.toDateString() === selectedDate.toDateString();
      calendarDays.push(
        <div 
          key={i} 
          className={`text-center text-sm cursor-pointer ${
            isSelected ? 'bg-blue-500 text-white rounded-full' : 'text-gray-700 hover:bg-gray-100'}`}
          onClick={() => setSelectedDateExternal(currentDate)}
        >
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  const prevMonth = () => {
    const newDate = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1);
    changeDisplayedMonth(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1);
    changeDisplayedMonth(newDate);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <div className="flex justify-center items-center mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mr-6">
    {displayedMonth.getFullYear()}年 {displayedMonth.getMonth() + 1}月
  </h2>
  <div className="flex ml-4">
    <button 
      onClick={prevMonth} 
      className="text-blue-500 bg-gray-100 w-10 h-10 flex items-center justify-center transition-all duration-200 ease-in-out mr-2 rounded-full hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50 !p-0 !border-0"
      aria-label="前の月"
    >
      <ChevronLeft size={24} />
    </button>
    <button 
      onClick={nextMonth} 
      className="text-blue-500 bg-gray-100 w-10 h-10 flex items-center justify-center transition-all duration-200 ease-in-out rounded-full hover:bg-gray-200 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50 !p-0 !border-0"
      aria-label="次の月"
    >
      <ChevronRight size={24} />
    </button>
  </div>
</div>
      <div className="grid grid-cols-7 gap-2">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-medium text-base text-gray-600">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default SubCalendar;