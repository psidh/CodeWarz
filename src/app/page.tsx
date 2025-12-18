'use client';
import { useState, useEffect } from 'react';
import { Code2, Sparkles } from 'lucide-react';
import CountdownTimer from '@/components/CountDown';

import { useRouter } from 'next/navigation';

export default function CodeWarzHomepage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="z-0 min-h-screen text-white overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="fixed bg-black">
        <div
          className="absolute inset-0 bg-linear-to-br from-blue-800/20 via-blue-500/20 to-white-500/20"
          style={{
            transform: `translate(${mousePos.x * 0.02}px, ${
              mousePos.y * 0.02
            }px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-semibold text-sm">
                Compete. Learn. Dominate.
              </span>
            </div>

            <h1 className="text-7xl font-bold leading-tight">
              <span className=" font-mono">CodeWarz</span>
              <br />
              <span className="text-white">Programming</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join pool of coders solving algorithmic challenges, competing in
              contests.
            </p>
            <CountdownTimer />
            <button
              onClick={() => {
                router.push('/problems');
              }}
              className="cursor-not-allowed  px-8 py-4 border border-blue-600 bg-linear-to-r from-blue-900 to-blue-600  rounded-xl transition-all duration-300 font-semibold"
            >
              Start Solving
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
    </div>
  );
}
