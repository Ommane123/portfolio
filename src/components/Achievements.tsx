import React from 'react';
import { Trophy, Code, Users, Calendar, Award } from 'lucide-react';

export const Achievements: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section 
      id="achievements" 
      className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      
      {/* Background gradients */}
      <div className="absolute right-1/4 top-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Achievements & Milestones</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
        
        {/* Card 1: TCS CodeVita */}
        <div className={`relative p-8 rounded-3xl border glass hover-card group overflow-hidden
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          {/* Card Accent Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/25 transition-colors duration-500" />
          
          <div className="space-y-6 relative z-10">
            
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-2xl border
                ${isDarkMode ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-cyan-500/10 border-cyan-300 text-cyan-600'}`}
              >
                <Trophy size={32} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Global Competition</span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-gray-100 dark:text-gray-100 mt-0.5">
                  TCS CodeVita Season 13
                </h3>
              </div>
            </div>

            {/* Content summary */}
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Competed and qualified in multiple stages of one of the world's largest competitive coding challenges, solving complex algorithmic, dynamic programming, and mathematical puzzles.
            </p>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border text-center
                ${isDarkMode ? 'bg-cyber-dark/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="text-2xl font-extrabold text-cyan-400 font-display">Rank 386</div>
                <div className={`text-[10px] uppercase font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Round 2 Results</div>
              </div>

              <div className={`p-4 rounded-xl border text-center
                ${isDarkMode ? 'bg-cyber-dark/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
              >
                <div className="text-2xl font-extrabold text-purple-400 font-display">Rank 7410</div>
                <div className={`text-[10px] uppercase font-bold mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Round 1 Results</div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 2: QHills Hackathon */}
        <div className={`relative p-8 rounded-3xl border glass hover-card group overflow-hidden
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          {/* Card Accent Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/25 transition-colors duration-500" />

          <div className="space-y-6 relative z-10">
            
            {/* Header */}
            <div className="flex items-center space-x-4">
              <div className={`p-4 rounded-2xl border
                ${isDarkMode ? 'bg-purple-500/5 border-purple-500/20 text-purple-400' : 'bg-purple-500/10 border-purple-300 text-purple-600'}`}
              >
                <Award size={32} className="group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">72-Hour Sprint</span>
                <h3 className="text-xl md:text-2xl font-bold font-display text-gray-100 dark:text-gray-100 mt-0.5">
                  QHills Hackathon – Satara
                </h3>
              </div>
            </div>

            {/* Content summary */}
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Collaborated in a high-intensity hackathon to architect and build an **AI-powered interview simulation platform**. The system utilized advanced NLP and OCR to analyze candidate resumes and auto-generate behavioral questions.
            </p>

            {/* Hackathon Specs */}
            <div className={`p-4 rounded-xl border space-y-3
              ${isDarkMode ? 'bg-cyber-dark/60 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-gray-400 font-medium">
                  <Users size={14} className="text-purple-400" />
                  <span>Team Alliance:</span>
                </span>
                <span className="font-bold text-purple-400">Team Nova</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-gray-400 font-medium">
                  <Calendar size={14} className="text-purple-400" />
                  <span>Timeline:</span>
                </span>
                <span className="font-bold text-gray-300 dark:text-gray-300">August 2025</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-gray-400 font-medium">
                  <Code size={14} className="text-purple-400" />
                  <span>Core Tech Stack:</span>
                </span>
                <span className="font-bold text-cyan-400">OCR, NLP, Gemini API</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
