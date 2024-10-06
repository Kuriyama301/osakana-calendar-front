import React from 'react';
import MainCalendar from '../components/MainCalendar';

const HomePage = () => {
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-[600px]">
        <MainCalendar />
      </div>
    </div>
  );
};

export default HomePage;