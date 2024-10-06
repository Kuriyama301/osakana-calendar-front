import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
        <Header className="flex-shrink-0" />
        <main className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;