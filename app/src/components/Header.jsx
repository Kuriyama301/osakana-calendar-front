import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white bg-opacity-80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          <Link to="/" className="text-blue-500 text-2xl font-bold">オサカナカレンダー</Link>
          <ul className="flex space-x-4">
            {/* ナビゲーションアイテムがあればここに追加 */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;