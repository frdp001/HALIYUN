/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { HeroContent } from './components/Hero';
import { LoginForm } from './components/LoginForm';
import { Footer } from './components/Footer';

export default function App() {
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
            <div className="flex justify-center lg:justify-start">
              <HeroContent />
            </div>
            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


