import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">オサカナカレンダー</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Home</Link></li>
          <li><Link to="/about" className="text-white">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;