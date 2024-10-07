import React from 'react';
import MainCalendar from '../components/MainCalendar';
import SubCalendar from '../components/SubCalendar';

const HomePage = () => {
  return (
    <div className="relative flex justify-center items-start p-4 min-h-screen bg-gray-100">
      {/* SubCalendar を絶対配置して MainCalendar のレイアウトに影響を与えない */}
      <div className="hidden md:block md:w-64 fixed left-5 top-20">
        <SubCalendar />
      </div>
      {/* MainCalendar を完全に中央に配置 */}
      <div className="w-full max-w-3xl">
        <MainCalendar />
      </div>
    </div>
  );
};

export default HomePage;