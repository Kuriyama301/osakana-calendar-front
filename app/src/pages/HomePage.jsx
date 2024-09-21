import React from 'react';
import MainCalendar from '../components/MainCalendar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        {/* <h1>オサカナカレンダー</h1> */}
      </header>
      <main className="main-content">
        <div className="calendar-container">
          <MainCalendar />
        </div>
      </main>
    </div>
  );
};

export default HomePage;