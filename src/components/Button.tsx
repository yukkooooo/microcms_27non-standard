import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  path?: string; // 追加: リンク先のパスを指定するプロパティ
}

const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children }) => {

  return (





    <button
      type={type}
      onClick={onClick}
      className="w-[90%] max-w-xs bg-[#4682b4]  text-white py-1 px-2 rounded-full shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-opacity-50"
    >
      {children}


    </button>
  );
};

export default Button;