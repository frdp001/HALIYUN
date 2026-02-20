import React from 'react';

export const Footer: React.FC = () => {
  const links = [
    "Alibaba Cloud", "DingTalk", "Wanwang", "Alipay", "Alibaba Group", 
    "Developer Community", "Help Center", "Alibaba Mail Personal Edition", 
    "Mail Push", "DingStore"
  ];

  return (
    <footer className="w-full py-12 bg-white flex flex-col items-center space-y-4">
      <a href="#" className="text-sm font-bold text-gray-800 hover:underline font-serif">About Us</a>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] text-gray-500 max-w-4xl px-8">
        {links.map((link, index) => (
          <React.Fragment key={link}>
            <a href="#" className="hover:text-gray-800">{link}</a>
            {index < links.length - 1 && <span className="text-gray-300">|</span>}
          </React.Fragment>
        ))}
      </div>
      <div className="text-[11px] text-gray-400">
        2009-2026 Aliyun.com Copyright reserved ICP: 浙B2-20080101
      </div>
    </footer>
  );
};
