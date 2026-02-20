import React, { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'dingtalk'>('account');

  return (
    <div className="w-full max-w-[380px] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'account' ? 'text-gray-900' : 'text-gray-400'}`}
        >
          Account Login
          {activeTab === 'account' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-900"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('dingtalk')}
          className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'dingtalk' ? 'text-gray-900' : 'text-gray-400'}`}
        >
          DingTalk Account Login
          {activeTab === 'dingtalk' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gray-900"></div>}
        </button>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Enter the complete enterprise mailbox or ad..." 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded focus:border-red-500 outline-none text-sm transition-colors"
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Enter password" 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded focus:border-red-500 outline-none text-sm transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center space-x-2 cursor-pointer text-gray-500">
            <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
            <span>Save Username</span>
          </label>
          <a href="#" className="text-gray-400 hover:text-gray-600">Forgot Password</a>
        </div>

        <button className="w-full bg-[#f54a45] hover:bg-[#e03a35] text-white py-3 rounded font-medium transition-colors shadow-lg shadow-red-200">
          Sign In
        </button>

        <div className="flex items-start space-x-2 text-[11px] text-gray-400 leading-relaxed">
          <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-red-600 focus:ring-red-500" />
          <span>
            I have read and agree with <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>, <a href="#" className="text-blue-500 hover:underline">Product Service Agreement</a>
          </span>
        </div>
      </div>

      <div className="bg-gray-50 py-4 flex items-center justify-center space-x-2 border-t border-gray-100">
        <div className="w-6 h-6 bg-[#f54a45] rounded flex items-center justify-center text-white text-[10px] font-bold">M</div>
        <span className="text-xs text-gray-400">Scan to sign in with Alimail</span>
      </div>
    </div>
  );
};
