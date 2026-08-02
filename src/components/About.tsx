import React, { useEffect, useState, useRef } from 'react';
import { Cpu, Code, Database, Cloud } from 'lucide-react';

const skillGroups = [
  {
    category: "Programming Languages",
    icon: <Code className="text-cyan-400" size={20} />,
    skills: ["Python", "C++", "SQL", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "AI & ML",
    icon: <Cpu className="text-purple-400" size={20} />,
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "RAG", "Sentence Transformers", "FAISS", "TensorFlow", "PyTorch", "Scikit-learn"]
  },
  {
    category: "Backend & Systems",
    icon: <Database className="text-pink-400" size={20} />,
    skills: ["Flask", "REST APIs", "SQLite", "Streamlit", "Docker", "Supabase"]
  },
  {
    category: "Cloud & Dev Tools",
    icon: <Cloud className="text-blue-400" size={20} />,
    skills: ["AWS", "Azure", "GCP", "GitHub", "VS Code"]
  }
];

const skillBars = [
  { name: "Python Development", level: 95, color: "from-cyan-400 to-blue-500" },
  { name: "Generative AI & LLMs", level: 90, color: "from-blue-500 to-purple-600" },
  { name: "RAG & Vector Search (FAISS)", level: 88, color: "from-purple-600 to-pink-500" },
  { name: "Backend APIs & Docker", level: 85, color: "from-pink-500 to-cyan-400" }
];

export const About: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [animateBars, setAnimateBars] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateBars(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      
      {/* Background gradients */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute left-0 bottom-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">About Me</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Animated RAG Agent Flowchart Illustration */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`w-full p-6 rounded-3xl border glass shadow-xl max-w-md relative overflow-hidden group
            ${isDarkMode ? 'border-gray-800 bg-cyber-dark/80' : 'border-gray-200'}`}
          >
            {/* Ambient card highlights */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-50 pointer-events-none" />
            
            <h3 className="text-sm font-semibold tracking-wider font-display uppercase mb-6 flex items-center space-x-2 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive RAG Pipeline Schema</span>
            </h3>

            {/* Neural diagram container */}
            <div className="space-y-6 relative z-10">
              {/* User block */}
              <div className="p-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 text-center transition-all duration-300 hover:border-cyan-400">
                <div className="text-xs text-cyan-400 font-semibold mb-1">User Query</div>
                <div className="text-xs text-gray-400 italic">"How does Ollama semantic search work?"</div>
              </div>

              {/* Arrow 1 */}
              <div className="flex justify-center h-4">
                <div className="w-[2px] bg-gradient-to-b from-cyan-400 to-purple-500 h-full animate-[pulse_1.5s_infinite]" />
              </div>

              {/* Embedding & Vector block */}
              <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center transition-all duration-300 hover:border-purple-500">
                <div className="text-xs text-purple-400 font-semibold mb-1">Embedding (Sentence Transformers)</div>
                <div className="text-xs text-gray-400">Convert query to vector representation</div>
              </div>

              {/* Arrow 2 */}
              <div className="flex justify-center h-4">
                <div className="w-[2px] bg-gradient-to-b from-purple-500 to-pink-500 h-full animate-[pulse_1.5s_infinite]" />
              </div>

              {/* Vector retrieval grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 rounded-lg border border-pink-500/20 bg-pink-500/5 text-center text-[10px] text-gray-400 transition-all hover:border-pink-500">
                  <div className="font-semibold text-pink-400">FAISS Index</div>
                  Similarity Search
                </div>
                <div className="p-2 rounded-lg border border-blue-500/20 bg-blue-500/5 text-center text-[10px] text-gray-400 transition-all hover:border-blue-500">
                  <div className="font-semibold text-blue-400">Context RAG</div>
                  Document chunks
                </div>
              </div>

              {/* Arrow 3 */}
              <div className="flex justify-center h-4">
                <div className="w-[2px] bg-gradient-to-b from-pink-500 to-cyan-400 h-full animate-[pulse_1.5s_infinite]" />
              </div>

              {/* LLM block */}
              <div className="p-3 rounded-xl border border-cyan-400/20 bg-cyan-500/5 text-center transition-all duration-300 hover:border-cyan-400">
                <div className="text-xs text-cyan-400 font-semibold mb-1">Local LLM (Ollama Model)</div>
                <div className="text-xs text-gray-400">GenAI Answer Generation</div>
              </div>
            </div>

            {/* Micro-interactive badge */}
            <div className={`mt-6 text-[10px] text-center text-gray-500 font-semibold border-t pt-4
              ${isDarkMode ? 'border-gray-800/80' : 'border-gray-200'}`}
            >
              Architecting secure, locally-hosted LLM systems.
            </div>
          </div>
        </div>

        {/* Right Side: Bio, Skills Badges, Skill Bars */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Bio text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-display">Om Mane</h3>
            <p className={`text-base leading-relaxed
              ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              I am Om Mane, a Computer Science Engineering graduate focused on Artificial Intelligence, Machine Learning, Large Language Models, Retrieval-Augmented Generation, backend development, and modern software engineering. I enjoy building intelligent applications that solve real-world problems while continuously learning emerging AI technologies.
            </p>
          </div>

          {/* Skill Bars */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-cyan-400">Expertise Levels</h4>
            <div className="space-y-4">
              {skillBars.map((bar, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{bar.name}</span>
                    <span className="text-cyan-400">{animateBars ? `${bar.level}%` : '0%'}</span>
                  </div>
                  <div className={`h-2 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-[1.5s] ease-out`}
                      style={{ width: animateBars ? `${bar.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Badges Grid */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-purple-400">Technical Skills</h4>
            
            <div className="space-y-5">
              {skillGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold tracking-wide uppercase text-gray-500">
                    {group.icon}
                    <span>{group.category}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border glass cursor-default transition-all duration-300 hover:scale-105 select-none
                          ${isDarkMode 
                            ? 'border-gray-800 text-gray-300 hover:border-cyan-400/40 hover:text-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
                            : 'border-gray-300 text-gray-700 hover:border-purple-500/40 hover:text-purple-600 hover:shadow-[0_0_12px_rgba(188,59,255,0.25)]'
                          }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
