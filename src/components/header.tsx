"use client";

import React from 'react';
import Link from 'next/link';
import { HeartIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/authContext';
import NavLinks from '@/pages/NavLinks';
import Hamburger from '@/pages/Hamburger';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase';


const Header: React.FC = () => {
  const { isLoggedIn } = useAuth(); // ログイン状態を取得

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Logged out!');
      // リダイレクトや状態の更新など
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header
      className="flex justify-between items-center w-full px-3 fixed top-0 left-0 bg-white shadow-md z-50 py-2 max-[480px]:py4 max-[480px]:px-4 px-6 z-10"
    >
      {/* 大きな画面で表示するナビゲーション */}
      <nav className="max-w-[1080px] mx-auto flex justify-between items-center w-full mt-13 max-[899px]:hidden">

        <div className="flex justify-between items-center w-full text-neutral-500">
          <ul className="flex space-x-1">
            <NavLinks isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
          </ul>

          <ul className="flex items-center space-x-1">
            <li className="mx-auto px-1">
              <Link href="/favorite">
                <HeartIcon className="w-5 h-5 hover:text-blue-500 transition-colors duration-300" />
              </Link>
            </li>
            <li className="mx-auto px-1">
              <Link href="/cart">
                <ShoppingCartIcon className="w-5 h-5 hover:text-blue-500 transition-colors duration-300" />
              </Link>
            </li>

            {isLoggedIn && (
              <li className="flex items-center justify-center mx-auto px-2">
                <span className="text-xs text-blue-500 flex items-center ">
                  logged in
                  <UserCircleIcon className="w-5 h-5 ml-1 text-blue-500 " />
                </span>
              </li>
            )}

          </ul>
        </div>
      </nav>

      {/* 小さい画面で表示するハンバーガーメニュー */}
      <Hamburger />
    </header>
  );
};

export default Header;