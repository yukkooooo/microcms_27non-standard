import React from 'react';
import Link from 'next/link';
import { HeartIcon, } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';



const Header: React.FC = () => {
  return (
    <header className="flex">
      <div className="container mx-auto px-5 py-2 flex">
        <ul>
          <li className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-emerald-950 px-4 font-medium text-neutral-200" ><Link href="/">login</Link></li>
        </ul>

        <nav className="container mx-auto px-5 py-2 right-top">
          <ul className="w-10 flex right-top " >
            <li className=" mx-auto px-2 "><Link href="/">home</Link></li>
            <li className=" mx-auto px-2 "><Link href="/">about</Link></li>
            <li className=" mx-auto px-2 "><Link href="/">contact</Link></li>
            <li className=" mx-auto px-2 "><Link href="/about"> <HeartIcon className="w-5 h-5" /></Link></li>
            <li className=" mx-auto px-2 "><Link href="/about"><ShoppingCartIcon className="w-5 h-5" /></Link></li>
          </ul>
        </nav>
      </div>


    </header>
  );
}

export default Header;


