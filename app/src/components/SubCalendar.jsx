import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../CalendarContext.jsx';

const SubCalendar = () => {
  const { selectedDate, setSelectedDate } = useCalendar();

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
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
          className={`text-center text-sm cursor-pointer ${isSelected ? 'bg-blue-500 text-white rounded-full' : ''}`}
          onClick={() => setSelectedDateExternal(currentDate)}
        >
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={prevMonth} 
          className="bg-white text-blue-500 text-xl font-bold w-8 h-8 rounded-full border border-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月
        </h2>
        <button 
          onClick={nextMonth} 
          className="bg-white text-blue-500 text-xl font-bold w-8 h-8 rounded-full border border-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} className="text-center font-medium text-sm text-gray-600">
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default SubCalendar;