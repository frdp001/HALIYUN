import React from 'react';

export const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center lg:items-start space-y-6 max-w-xl text-center lg:text-left">
      <div className="flex items-center space-x-2">
        <div className="flex items-center text-orange-500 font-bold text-2xl">
          <span className="mr-1">[-]</span>
          <span>阿里云</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
          39元AI建站, 送.CN域名
        </h1>
        <p className="text-gray-700 text-2xl font-medium">品牌官网, 即刻上线</p>
      </div>

      <div className="pt-4">
        <button className="bg-blue-600 text-white px-8 py-2 rounded flex items-center space-x-2 hover:bg-blue-700 transition-colors text-sm font-medium">
          <span>查看详情</span>
          <span>→</span>
        </button>
      </div>

      <div className="w-full pt-12">
        <img 
          src="https://picsum.photos/seed/tech-cloud/800/400?blur=2" 
          alt="Tech background" 
          className="w-full h-auto opacity-60 mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

