import { useState, useEffect } from 'react';
import { CanvasBackground } from './components/CanvasBackground';
import { MouseFollower } from './components/MouseFollower';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Resume } from './components/Resume';
import { Achievements } from './components/Achievements';
import { Footer } from './components/Footer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('BOOTING DIGITAL ENVIRONMENT...');

  // Theme Sync Effect
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
      document.body.style.backgroundColor = '#07080e';
      document.body.style.color = '#d1d5db';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f3f4f6';
      document.body.style.color = '#374151';
    }
  }, [isDarkMode]);

  // AI-Themed Loading Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setLoadingText('SYSTEM READY. PORTAL OPENING.');
          setTimeout(() => setIsLoading(false), 600);
          return 100;
        }
        
        // Update bootlog texts based on percentage
        if (next > 75) {
          setLoadingText('LAUNCHING PORTFOLIO AGENT...');
        } else if (next > 45) {
          setLoadingText('COMPILING RETRIEVAL CONTEXT (RAG)...');
        } else if (next > 20) {
          setLoadingText('CONNECTING NEURAL COGNITION LAYERS...');
        }
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* AI Preloader Screen */}
      <div 
        className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#07080e] transition-all duration-700 ease-in-out
          ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="text-center max-w-sm w-full px-6 space-y-6">
          {/* Animated Glowing Ring Core */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/25 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-t-purple-500 border-r-transparent border-l-transparent border-b-transparent animate-[spin_1s_linear_infinite]" />
            <div className="w-8 h-8 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
          </div>

          {/* Terminal Console Text */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-cyan-400 tracking-wide select-none">
              &gt; {loadingText}
            </div>
            {/* Progress Bar Container */}
            <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden border border-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 rounded-full transition-all duration-150"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-gray-500 select-none">
              LOADING SYSTEM MODULES // {loadingProgress}%
            </div>
          </div>
        </div>
      </div>

      {/* Primary Layout */}
      {!isLoading && (
        <div className="relative min-h-screen">
          {/* Interactive Background Canvas */}
          <CanvasBackground isDarkMode={isDarkMode} />
          
          {/* Custom Mouse Follower Cursor */}
          <MouseFollower />

          {/* Sticky Navigation bar */}
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* Page content segments */}
          <main className="relative">
            <Hero isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <Projects isDarkMode={isDarkMode} />
            <Resume isDarkMode={isDarkMode} />
            <Achievements isDarkMode={isDarkMode} />
          </main>

          {/* Page Footer */}
          <Footer isDarkMode={isDarkMode} />
        </div>
      )}
    </>
  );
}

export default App;
