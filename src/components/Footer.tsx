import React from 'react';

export const Footer: React.FC = () => {
  const links = [
    "Alibaba Cloud", "DingTalk", "Wanwang", "Alipay", "Alibaba Group", 
    "Developer Community", "Help Center", "Alibaba Mail Personal Edition", 
    "Mail Push", "DingStore"
  ];

  return (
    <footer className="w-full py-10 bg-white flex flex-col items-center space-y-3">
      <a href="#" className="text-[11px] font-bold text-gray-800 hover:underline font-serif tracking-wider">About Us</a>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] text-gray-400 max-w-4xl px-8">
        {links.map((link) => (
          <a key={link} href="#" className="hover:text-gray-600">{link}</a>
        ))}
      </div>
      <div className="text-[10px] text-gray-400">
        2009-2026 Aliyun.com Copyright reserved ICP: 浙B2-20080101
      </div>
    </footer>
  );
};
