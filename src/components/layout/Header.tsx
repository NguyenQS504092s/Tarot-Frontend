import Link from 'next/link';
import React from 'react'; // Add React import

export default function Header() {
  return (
    <header className="bg-purple-900 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-purple-300 transition-colors">
          Tarot World
        </Link>
        <div className="space-x-4">
          <Link href="/cards" className="hover:text-purple-300 transition-colors">
            Lá Bài
          </Link>
          <Link href="/spreads" className="hover:text-purple-300 transition-colors">
            Trải Bài
          </Link>
          {/* <Link href="/readings" className="hover:text-purple-300 transition-colors">
            Xem Bài
          </Link> */}
          <Link href="/astrology" className="hover:text-purple-300 transition-colors">
            Tử Vi
          </Link>
          <Link href="/blog" className="hover:text-purple-300 transition-colors">
            Blog
          </Link>
          {/* Add Login/Register/Profile links later */}
           <Link href="/login" className="hover:text-purple-300 transition-colors">
            Đăng Nhập
          </Link>
           <Link href="/register" className="hover:text-purple-300 transition-colors">
            Đăng Ký
          </Link>
        </div>
      </nav>
    </header>
  );
}
