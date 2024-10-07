import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white p-4 h-16"> {/* h-16 を追加してヘッダーの高さを固定 */}
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-blue-500 text-2xl font-bold">オサカナカレンダー</Link>
        <ul className="flex space-x-4">
        </ul>
      </nav>
    </header>
  );
}

export default Header;