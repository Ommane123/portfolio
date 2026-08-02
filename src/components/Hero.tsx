import React, { useState, useEffect, useRef } from 'react';
import { Download, ChevronRight, MessageSquare, Terminal } from 'lucide-react';
import profilePhoto from '../assets/ommane.png';
import resumePdf from '../assets/Om_mane_9322035184 (2).pdf';

// Floating tech badges configuration
const floatingBadges = [
  { name: 'Python', style: 'top-10 left-[10%] animate-float-slow bg-cyan-500/10 border-cyan-500/30' },
  { name: 'Docker', style: 'top-24 right-[5%] animate-float-medium bg-purple-500/10 border-purple-500/30' },
  { name: 'Git', style: 'bottom-20 left-[2%] animate-float-fast bg-pink-500/10 border-pink-500/30' },
  { name: 'PyTorch', style: 'bottom-10 right-[15%] animate-float-slow bg-cyan-500/10 border-cyan-500/30' },
  { name: 'Streamlit', style: 'top-[45%] right-[-5%] animate-float-medium bg-purple-500/10 border-purple-500/30' },
  { name: 'FAISS', style: 'bottom-[40%] left-[-8%] animate-float-slow bg-pink-500/10 border-pink-500/30' },
  { name: 'LLM', style: 'top-[-5%] left-[45%] animate-float-fast bg-cyan-500/10 border-cyan-500/30' }
];

export const Hero: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  // Typing Effect State
  const roles = [
    "AI Engineer",
    "Machine Learning Engineer",
    "Python Developer",
    "LLM Developer",
    "RAG Developer",
    "Backend Developer",
    "Problem Solver"
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Parallax mouse variables
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Stats Counter State
  const [stats, setStats] = useState({
    projects: 0,
    hackathons: 0,
    technologies: 0,
    codevitaRank: 0
  });

  const heroRef = useRef<HTMLDivElement>(null);

  // Custom typing animation loop
  useEffect(() => {
    let timer: number;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(80);

        if (currentText === fullText) {
          // Pause at the end of word
          timer = window.setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }

      timer = window.setTimeout(handleType, typingSpeed);
    };

    timer = window.setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  // Mouse Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { width, height, left, top } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 35;
      const y = (e.clientY - top - height / 2) / 35;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stats counting effect
  useEffect(() => {
    const targetStats = {
      projects: 15,
      hackathons: 3,
      technologies: 12,
      codevitaRank: 386
    };

    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const totalSteps = duration / intervalTime;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats({
        projects: Math.min(targetStats.projects, Math.floor((targetStats.projects / totalSteps) * step)),
        hackathons: Math.min(targetStats.hackathons, Math.floor((targetStats.hackathons / totalSteps) * step)),
        technologies: Math.min(targetStats.technologies, Math.floor((targetStats.technologies / totalSteps) * step)),
        codevitaRank: Math.min(targetStats.codevitaRank, Math.floor((targetStats.codevitaRank / totalSteps) * step))
      });

      if (step >= totalSteps) {
        clearInterval(timer);
        // Ensure final values are set exactly
        setStats(targetStats);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden px-6 md:px-12 max-w-7xl mx-auto z-10"
    >
      
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        
        {/* Left column: Bio, Typing Text, Actions */}
        <div className="lg:col-span-7 flex flex-col text-left space-y-6 md:space-y-8 order-2 lg:order-1">
          
          <div className="space-y-2">
            <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider
              ${isDarkMode 
                ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' 
                : 'bg-purple-500/5 border-purple-500/20 text-purple-600'
              }`}
            >
              <Terminal size={14} className="animate-pulse" />
              <span>Systems Online // Portfolio Active</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Hi, <br />
              I'm <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">Om Mane</span>
            </h1>

            {/* Typing text container */}
            <div className={`h-12 flex items-center font-display font-semibold text-xl md:text-3xl tracking-wide 
              ${isDarkMode ? 'text-cyan-400' : 'text-purple-600'}`}
            >
              <span>{currentText}</span>
              <span className="w-[3px] h-7 bg-current ml-1 animate-pulse" />
            </div>
          </div>

          <p className={`text-base md:text-lg max-w-xl leading-relaxed
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            A Computer Science Engineering graduate passionate about Artificial Intelligence, Large Language Models, Retrieval-Augmented Generation, Machine Learning, Backend Development, and building scalable AI-powered applications.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => scrollTo('projects')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>View Projects</span>
              <ChevronRight size={18} />
            </button>

            <a
              href={resumePdf}
              download="Om_Mane_Resume.pdf"
              className={`px-6 py-3 border font-semibold rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer
                ${isDarkMode 
                  ? 'border-gray-800 hover:border-cyan-400 hover:bg-cyan-500/10 text-gray-200 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-500/10 text-gray-700 hover:text-purple-600'
                }`}
            >
              <Download size={18} />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => scrollTo('footer')}
              className={`px-6 py-3 border font-semibold rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer
                ${isDarkMode 
                  ? 'border-gray-800 hover:border-purple-400 hover:bg-purple-500/10 text-gray-200 hover:text-purple-400 hover:shadow-[0_0_15px_rgba(188,59,255,0.15)]' 
                  : 'border-gray-300 hover:border-cyan-500 hover:bg-cyan-500/10 text-gray-700 hover:text-cyan-600'
                }`}
            >
              <MessageSquare size={18} />
              <span>Contact Me</span>
            </button>
          </div>

        </div>

        {/* Right column: Avatar / Interactive Photo & Orbiting Badges */}
        <div 
          className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 relative"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {/* Orbital rings */}
          <div className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-cyan-500/20 animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full border border-purple-500/10 animate-[spin_25s_linear_infinite_reverse] scale-95" />
          <div className="absolute w-[360px] h-[360px] md:w-[440px] md:h-[440px] rounded-full border border-cyan-400/5 animate-[spin_60s_linear_infinite]" />

          {/* Floating Badges */}
          {floatingBadges.map((badge, idx) => (
            <div
              key={idx}
              className={`absolute px-3 py-1 rounded-full border text-xs font-semibold shadow-md pointer-events-none select-none ${badge.style}`}
              style={{
                animationDelay: `${idx * 0.7}s`,
                backdropFilter: 'blur(4px)'
              }}
            >
              {badge.name}
            </div>
          ))}

          {/* Glowing Avatar frame with Image */}
          <div className="relative group p-1.5 rounded-3xl overflow-hidden glass shadow-2xl transition-all duration-500 hover:scale-[1.02] border-cyan-500/25 border">
            {/* Animated card border background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-transparent to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Cyber Scanning line */}
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0 animate-[bounce_8s_infinite] pointer-events-none z-20 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />

            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[22px] overflow-hidden bg-cyber-dark/80">
              <img 
                src={profilePhoto} 
                alt="Om Mane" 
                className="w-full h-full object-cover brightness-[0.9] contrast-[1.05] group-hover:brightness-100 transition-all duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Sci-fi Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute inset-0 border-[3px] border-cyan-500/10 rounded-[20px] pointer-events-none group-hover:border-cyan-400/30 transition-colors duration-500" />
            </div>
          </div>

        </div>

      </div>

      {/* Bottom stats layout */}
      <div className="w-full mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10 max-w-6xl">
        <div className={`p-5 rounded-2xl border glass text-center hover-card group cursor-default
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            {stats.projects}+
          </div>
          <div className={`text-xs md:text-sm mt-2 font-medium tracking-wide
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Projects Completed
          </div>
        </div>

        <div className={`p-5 rounded-2xl border glass text-center hover-card group cursor-default
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            {stats.hackathons}
          </div>
          <div className={`text-xs md:text-sm mt-2 font-medium tracking-wide
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Hackathons Participated
          </div>
        </div>

        <div className={`p-5 rounded-2xl border glass text-center hover-card group cursor-default
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            {stats.technologies}+
          </div>
          <div className={`text-xs md:text-sm mt-2 font-medium tracking-wide
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            Core Technologies
          </div>
        </div>

        <div className={`p-5 rounded-2xl border glass text-center hover-card group cursor-default
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
            #{stats.codevitaRank}
          </div>
          <div className={`text-xs md:text-sm mt-2 font-medium tracking-wide
            ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
          >
            CodeVita Round 2 Rank
          </div>
        </div>
      </div>

    </section>
  );
};
