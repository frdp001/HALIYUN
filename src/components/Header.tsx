import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-2">
        <a href="/" className="flex items-center">
          <img 
            src="https://qiye.aliyun.com/static/0.2.9/images/forNetCN/logo.png" 
            alt="Alibaba Mail" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
      <nav className="flex items-center space-x-6 text-xs text-gray-600">
        <a href="#" className="hover:text-red-600">DingTalk</a>
        <a href="#" className="hover:text-red-600">Alibaba Mail</a>
        <a href="#" className="hover:text-red-600">Aliyun Mail Login</a>
        <a href="#" className="hover:text-red-600">Client Apps</a>
        <a href="#" className="hover:text-red-600">Help</a>
        <div className="flex items-center border border-gray-300 rounded px-2 py-1">
          <select className="bg-transparent outline-none cursor-pointer">
            <option>English</option>
            <option>简体中文</option>
          </select>
        </div>
      </nav>
    </header>
  );
};
