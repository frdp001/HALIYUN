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
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full flex-1 flex items-center justify-center py-12 px-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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


