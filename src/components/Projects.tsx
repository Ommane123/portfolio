import React, { useRef, useState } from 'react';
import { ExternalLink, Bot, Eye, Languages, GitBranch } from 'lucide-react';
import { GitHub } from './BrandIcons';

interface Project {
  title: string;
  technologies: string[];
  description: string;
  github: string;
  live?: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
}

const projectsData: Project[] = [
  {
    title: "AI Powered Software Support Chatbot",
    technologies: ["Python", "Flask", "SQLite", "Ollama", "RAG", "FAISS", "Sentence Transformers", "LLM"],
    description: "Built an AI-powered enterprise chatbot using Retrieval-Augmented Generation, semantic search, vector databases, REST APIs, and locally hosted LLMs with Ollama for intelligent document-based conversations.",
    github: "https://github.com/Ommane123/chat",
    live: "https://chatbot1327.streamlit.app",
    icon: <Bot className="text-cyan-400" size={24} />,
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <line x1="20" y1="40" x2="380" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        {/* Terminal dots */}
        <circle cx="35" cy="22" r="5" fill="#ff5f56"/>
        <circle cx="50" cy="22" r="5" fill="#ffbd2e"/>
        <circle cx="65" cy="22" r="5" fill="#27c93f"/>
        {/* Vector DB nodes */}
        <circle cx="300" cy="110" r="25" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" fill="rgba(0, 240, 255, 0.05)" className="animate-pulse"/>
        <circle cx="300" cy="110" r="10" fill="#00f0ff"/>
        {/* Chat bubbles */}
        <rect x="30" y="60" width="160" height="35" rx="8" fill="rgba(188, 59, 255, 0.1)" stroke="rgba(188, 59, 255, 0.2)" strokeWidth="1"/>
        <text x="40" y="80" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">Query: Fetch docs...</text>
        
        <rect x="120" y="115" width="130" height="35" rx="8" fill="rgba(0, 240, 255, 0.1)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1"/>
        <text x="130" y="135" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">RAG: FAISS Retrieval</text>
        
        {/* Connected path lines */}
        <path d="M 190 77 L 275 110" stroke="#bc3bff" strokeWidth="1.5" strokeDasharray="4" className="animate-[dash_2s_linear_infinite]"/>
        <path d="M 275 110 L 250 132" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4"/>
      </svg>
    )
  },
  {
    title: "Driver Drowsiness Detection System",
    technologies: ["Python", "OpenCV", "Machine Learning", "Streamlit", "SQLite"],
    description: "Real-time driver safety system detecting eye closure, yawning, and distraction using computer vision with automated alert mechanisms.",
    github: "https://github.com/Ommane123",
    live: "https://ommane123.github.io/Driver_Drowsiness_Detection/",
    icon: <Eye className="text-purple-400" size={24} />,
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        {/* Face tracking grid */}
        <path d="M 100 50 L 300 50 L 300 150 L 100 150 Z" stroke="rgba(188, 59, 255, 0.2)" strokeWidth="1"/>
        {/* Eye tracking circles */}
        <circle cx="160" cy="90" r="25" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188, 59, 255, 0.05)"/>
        <circle cx="160" cy="90" r="6" fill="#bc3bff"/>
        
        <circle cx="240" cy="90" r="25" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.05)"/>
        <circle cx="240" cy="90" r="6" fill="#00f0ff"/>
        
        {/* Scanner targets */}
        <path d="M 140 90 L 180 90 M 160 70 L 160 110" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <path d="M 220 90 L 260 90 M 240 70 L 240 110" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        
        {/* Alerts HUD */}
        <rect x="130" y="145" width="140" height="25" rx="6" fill="rgba(255, 95, 86, 0.1)" stroke="#ff5f56" strokeWidth="1" className="animate-pulse"/>
        <text x="145" y="161" fill="#ff5f56" fontSize="10" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">STATUS: DROWSY</text>
      </svg>
    )
  },
  {
    title: "AI Language Translation Tool",
    technologies: ["Python", "NLP", "Translation API", "Streamlit"],
    description: "Multilingual AI translation application with automatic language detection and responsive interface.",
    github: "https://github.com/Ommane123/Language-Translation-Tool",
    live: "https://ommane123.github.io/Language-Translation-Tool/",
    icon: <Languages className="text-pink-400" size={24} />,
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        {/* Connected Translation nodes */}
        <circle cx="120" cy="100" r="30" stroke="rgba(255, 0, 127, 0.3)" strokeWidth="2" fill="rgba(255, 0, 127, 0.05)"/>
        <text x="110" y="106" fill="#ff007f" fontSize="18" fontWeight="bold">EN</text>
        
        <circle cx="280" cy="100" r="30" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="2" fill="rgba(0, 240, 255, 0.05)"/>
        <text x="270" y="106" fill="#00f0ff" fontSize="18" fontWeight="bold">FR</text>
        
        {/* Arrows and status line */}
        <path d="M 160 90 C 200 70, 200 70, 240 90" stroke="#ff007f" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="3" className="animate-[dash_3s_linear_infinite]"/>
        <path d="M 240 110 C 200 130, 200 130, 160 110" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3"/>
        
        <rect x="150" y="145" width="100" height="20" rx="4" fill="rgba(255,255,255,0.05)"/>
        <text x="165" y="158" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">Auto-Detecting...</text>
      </svg>
    )
  },
  {
    title: "Rule Based Chatbot",
    technologies: ["Python", "NLP"],
    description: "Developed a rule-based chatbot capable of responding to predefined user queries using structured conversational logic.",
    github: "https://github.com/Ommane123/Chatbot-with-Rule-Based-Response",
    live: "https://ommane123.github.io/Chatbot-with-Rule-Based-Response/",
    icon: <GitBranch className="text-blue-400" size={24} />,
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        {/* Decision trees */}
        <circle cx="200" cy="50" r="16" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.1)"/>
        <text x="195" y="54" fill="#00f0ff" fontSize="10" fontFamily="monospace">IF</text>
        
        <line x1="200" y1="66" x2="140" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="200" y1="66" x2="260" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        
        <circle cx="140" cy="120" r="16" stroke="rgba(188, 59, 255, 0.4)" strokeWidth="1.5" fill="rgba(188, 59, 255, 0.1)"/>
        <text x="135" y="124" fill="#bc3bff" fontSize="8" fontFamily="monospace">THEN</text>
        
        <circle cx="260" cy="120" r="16" stroke="rgba(188, 59, 255, 0.4)" strokeWidth="1.5" fill="rgba(188, 59, 255, 0.1)"/>
        <text x="255" y="124" fill="#bc3bff" fontSize="8" fontFamily="monospace">ELSE</text>
        
        <line x1="140" y1="136" x2="110" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <line x1="140" y1="136" x2="170" y2="160" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        
        <text x="75" y="172" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Response A</text>
        <text x="155" y="172" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">Response B</text>
      </svg>
    )
  }
];

const ProjectCard: React.FC<{ project: Project; isDarkMode: boolean }> = ({ project, isDarkMode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate rotation angle (max 10 degrees tilt)
    const rotateX = ((y - height / 2) / (height / 2)) * -6;
    const rotateY = ((x - width / 2) / (width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border glass overflow-hidden transition-all duration-300 interactive-card
        ${isDarkMode 
          ? 'border-gray-800 bg-cyber-dark/40 hover:border-cyan-500/30' 
          : 'border-gray-200 bg-white/70 hover:border-purple-500/30'
        }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.01 : 1})`,
        transition: isHovered ? 'none' : 'transform 0.5s ease',
        boxShadow: isHovered 
          ? (isDarkMode ? '0 15px 30px rgba(0,240,255,0.08)' : '0 15px 30px rgba(188,59,255,0.08)')
          : 'none'
      }}
    >
      {/* Glow gradient overlay tracking pointer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${isDarkMode ? 'rgba(0, 240, 255, 0.15)' : 'rgba(188, 59, 255, 0.15)'}, transparent 80%)`
          }}
        />
      )}

      {/* Decorative running outline on hover */}
      <div 
        className={`absolute inset-0 border border-transparent transition-colors duration-500 rounded-3xl pointer-events-none z-20
          ${isHovered 
            ? (isDarkMode ? 'border-cyan-500/20' : 'border-purple-500/20') 
            : 'border-transparent'
          }`}
      />

      {/* Card Illustration */}
      <div className="relative aspect-video overflow-hidden border-b border-gray-800/20">
        {project.illustration}
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/90 via-transparent to-transparent opacity-60" />
      </div>

      {/* Details content */}
      <div className="p-6 space-y-4 text-left">
        
        {/* Title & Icon */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight font-display text-gray-100 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <div className="p-1.5 rounded-lg glass bg-gray-800/10">
            {project.icon}
          </div>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border
                ${isDarkMode 
                  ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400/80 hover:text-cyan-400' 
                  : 'bg-purple-500/5 border-purple-500/10 text-purple-600/80 hover:text-purple-600'
                }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className={`text-sm leading-relaxed line-clamp-3
          ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {project.description}
        </p>

        {/* Actions CTA buttons */}
        <div className="flex items-center space-x-3 pt-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 border text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all duration-300
              ${isDarkMode 
                ? 'border-gray-800 hover:border-cyan-400 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400' 
                : 'border-gray-300 hover:border-purple-500 hover:bg-purple-500/10 text-gray-700 hover:text-purple-600'
              }`}
          >
            <GitHub size={14} />
            <span>GitHub</span>
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-all duration-300 shadow-md hover:shadow-cyan-500/15"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};

export const Projects: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      
      {/* Background light shapes */}
      <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Featured Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {projectsData.map((project, idx) => (
          <ProjectCard key={idx} project={project} isDarkMode={isDarkMode} />
        ))}
      </div>

    </section>
  );
};
