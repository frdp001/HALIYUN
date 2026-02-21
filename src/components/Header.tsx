import React from 'react';
import { obfuscate } from '../utils/security';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white max-w-7xl mx-auto w-full">
      <div className="flex items-center">
        <a href="/" className="flex items-center">
          <img 
            src="https://qiye.aliyun.com/static/0.2.9/images/forNetCN/logo.png" 
            alt="Alibaba Mail" 
            className="h-9 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
      <nav className="flex items-center text-[11px] text-gray-500">
        <a href="#" className="hover:text-red-500 px-2">{obfuscate('DingTalk')}</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 px-2">{obfuscate('Alibaba Mail')}</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 px-2">{obfuscate('Aliyun Mail Login')}</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 px-2">{obfuscate('Client Apps')}</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 px-2">{obfuscate('Help')}</a>
        <div className="ml-4 flex items-center border border-gray-200 rounded px-1 py-0.5 bg-gray-50">
          <select className="bg-transparent outline-none cursor-pointer text-[11px]">
            <option>English</option>
            <option>简体中文</option>
          </select>
        </div>
      </nav>
    </header>
  );
};
