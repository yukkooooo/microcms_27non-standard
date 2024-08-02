import React from 'react';
import Link from 'next/link';
import { HeartIcon, } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';



const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center  w-full px-7 fixed top-0 left-0  bg-white shadow-md z-50">
      <div className=" flex px-5 py-1 justify-between items-center w-full mt-13">
        <ul className='flex  justify-between '>
          <li className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-full bg-emerald-950 px-4 font-medium text-neutral-200" ><Link href="/">login</Link></li>
        </ul>

        <nav className=" flex justify-between items-center px-5 py-2 w-full ">
          <ul className="flex  space-x-4" >
            <li className=" mx-auto px-2 "><Link href="/">home</Link></li>
            <li className=" mx-auto px-2 "><Link href="/">about</Link></li>
            <li className=" mx-auto px-2 "><Link href="/">contact</Link></li>

          </ul>
          <ul className="flex space-x-4 ">
            <li className=" mx-auto px-2 "><Link href="/about"> <HeartIcon className="w-5 h-5" /></Link></li>
            <li className=" mx-auto px-2 "><Link href="/about"><ShoppingCartIcon className="w-5 h-5" /></Link></li>
          </ul>
        </nav>
      </div>


    </header>
  );
}

export default Header;


