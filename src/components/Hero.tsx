import React from 'react';

export const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 max-w-xl">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-800 flex items-baseline">
          阿里邮箱<span className="text-orange-500 ml-2 italic">新</span>服务
        </h1>
        <p className="text-gray-500 text-lg">订阅官方邮件组，了解产品最新动态</p>
      </div>

      {/* Product Showcase Image */}
      <div className="relative w-full max-w-2xl py-4">
        <img 
          src="https://img.alicdn.com/tfs/TB1_u77u7T2gK0jSZFkXXcIQFXa-940-460.png" 
          alt="Alibaba Mail Multi-device Showcase" 
          className="w-full h-auto object-contain drop-shadow-xl"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Features */}
      <div className="flex space-x-8 text-xs text-gray-500">
        <div className="flex flex-col items-center space-y-1">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400 font-bold">%</span>
          </div>
          <span>最新优惠</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400 font-bold">NEW</span>
          </div>
          <span>产品新闻</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400 font-bold">👤</span>
          </div>
          <span>服务通知</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
            <span className="text-gray-400 font-bold">📋</span>
          </div>
          <span>使用案例</span>
        </div>
      </div>

      {/* Subscription Input */}
      <div className="flex max-w-md bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
        <input 
          type="text" 
          placeholder="输入邮箱地址" 
          className="flex-1 px-4 py-3 outline-none text-gray-600"
        />
        <button className="bg-orange-500 text-white px-6 py-3 font-medium flex items-center space-x-2 hover:bg-orange-600 transition-colors">
          <span>立即订阅</span>
          <span className="text-lg">🔔</span>
        </button>
      </div>
    </div>
  );
};

