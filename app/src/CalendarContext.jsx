import React, { createContext, useState, useContext } from 'react';

const CalendarContext = createContext();

export const useCalendar = () => useContext(CalendarContext);

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExternalSelection, setIsExternalSelection] = useState(false);

  const setSelectedDateExternal = (date) => {
    setIsExternalSelection(true);
    setSelectedDate(date);
  };

  return (
    <CalendarContext.Provider value={{ 
      selectedDate, 
      setSelectedDate, 
      isExternalSelection, 
      setSelectedDateExternal 
    }}>
      {children}
    </CalendarContext.Provider>
  );
};