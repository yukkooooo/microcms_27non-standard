"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";


const handleSignOut = () => {
  // ログアウト後の処理
  console.log('Logged out!');
  // 例えば、リダイレクトや状態の更新など
};


type LinkType = {
  label: string;
  href: string;
  admin?: boolean; // admin プロパティをオプショナルとして追加
  onClick?: () => void; // `onClick` プロパティを追加
};


type PropsType = {
  propClass?: string;
  setIsMenuOpen?: (arg0: boolean) => void;
  isLoggedIn: boolean;
  onSignOut?: () => void; // ここで onSignOut プロップスを追加
};



const NavLinks = ({ propClass, setIsMenuOpen, isLoggedIn, onSignOut }: PropsType) => {
  const currentPath = usePathname();

  const links: LinkType[] = [

    isLoggedIn
      ? { label: "logout", href: "#", onClick: onSignOut } // `onClick` を追加
      : { label: "login", href: "/login" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
    { label: "home", href: "/" },
  ];

  return (
    <div
      className={` gap-1 mx-3 max-[450px]:flex-row text-white min-[900px]:text-black
      max-[899px]:gap-9 max-[767px]:w-[fit-content] max-[767px]:last:w-[90%] ${propClass}`}
    >
      {links.map((link) => (
        <Link
          href={link.href}
          className={`hover:text-blue-500 transition-colors duration-300 w-[fit-content] px-3 py-1 text-sm cursor-pointer text-[1.1rem]
          ${link.admin && 'bg-white-500 '}
          ${currentPath === link.href ? 'shadow-1' : ''}`}
          key={link.label}
          onClick={(e) => {
            if (link.href === '#' && link.onClick) {
              e.preventDefault(); // デフォルトのリンク動作をキャンセル
              link.onClick(); // ログアウト処理を呼び出す
            } else {
              setIsMenuOpen && setIsMenuOpen(false);
            }
          }}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;