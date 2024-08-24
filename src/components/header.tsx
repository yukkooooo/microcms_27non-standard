import React from 'react';
import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/authContext';

const Header: React.FC = () => {
  const { isLoggedIn } = useAuth(); // ログイン状態を取得

  return (
    <header className="flex justify-between items-center w-full px-3 fixed top-0 left-0 bg-white shadow-md z-50">
      <div className="flex px-1 py-1 justify-between items-center w-full mt-13">

        <nav className="flex justify-between items-center px-1 py-2 w-full text-neutral-500">
          <ul className="flex space-x-1">
            <li className="text-xs sm:text-base md:text-lg mx-auto px-2 text-neutral-500"><Link href="/">login</Link></li>
            <li className="text-xs sm:text-base md:text-lg mx-auto px-2 text-neutral-500"><Link href="/">home</Link></li>
            <li className="text-xs sm:text-base md:text-lg  mx-auto px-2 text-neutral-500"><Link href="/">about</Link></li>
            <li className="text-xs sm:text-base md:text-lg mx-auto px-2 text-neutral-500"><Link href="/">contact</Link></li>
          </ul>

          <ul className="flex items-center space-x-1">

            <li className="mx-auto px-1">
              <Link href="/about">
                <HeartIcon className="w-5 h-5" />
              </Link>
            </li>
            <li className="mx-auto px-1">
              <Link href="/about">
                <ShoppingCartIcon className="w-5 h-5" />
              </Link>
            </li>
            <ul className="flex items-center justify-center space-x-4">
              {isLoggedIn && (
                <li className="flex items-center justify-center mx-auto px-2">
                  <span className="text-xs text-pink-500 flex items-center">
                    logged in
                    <UserCircleIcon className="w-5 h-5 ml-1" />
                  </span> {/* ログイン中のメッセージを表示 */}
                </li>
              )}
            </ul>
          </ul>
        </nav>
      </div>
    </header >
  );
};

export default Header;
