import React from 'react';
import MainCalendar from '../components/MainCalendar';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">オサカナカレンダー</h1>
      </header>
      <main className="flex-grow">
        <MainCalendar />
      </main>
    </div>
  );
};

export default HomePage;