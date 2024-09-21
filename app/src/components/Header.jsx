import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 p-4" style={{ width: '100%' }}> 
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">オサカナカレンダー</Link>
        <ul className="flex space-x-4">
        </ul>
      </nav>
    </header>
  );
}

export default Header;