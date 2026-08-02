import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Cpu, FileText, Download, Eye } from 'lucide-react';

export const Resume: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState<'education' | 'skills' | 'experience' | 'hackathons'>('education');

  const educationData = [
    {
      year: "2022 - 2026",
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Dnyanshree Institute of Engineering and Technology, Satara",
      details: "Affiliated to DBATU Lonere. Focused on Artificial Intelligence, Machine Learning, Data Structures, Database Management, and Software Engineering."
    },
    {
      year: "2020 - 2022",
      degree: "Higher Secondary (12th Grade)",
      institution: "Kisan Veer Mahavidyalaya, Wai",
      details: "Focused on Science Stream (Physics, Chemistry, Mathematics, Computer Science)."
    },
    {
      year: "2020",
      degree: "Secondary (10th Grade)",
      institution: "Shree Shivaji English Medium School, Surur",
      details: "Completed Secondary School Certificate with distinction."
    }
  ];

  const experienceData = [
    {
      role: "AI & Software Engineering Intern / Fresh Graduate",
      period: "2025 - Present",
      company: "Academic & Personal Projects",
      details: "Focusing on creating production-ready Generative AI systems, RAG integration, vector similarity search systems with FAISS, and custom REST API development using Flask. Experienced in testing, containerization, and modern MLOps pipelines."
    }
  ];

  const skillsData = [
    { category: "Programming Languages", items: "Python, C++, SQL, JavaScript, HTML, CSS" },
    { category: "Machine Learning & AI", items: "Generative AI, LLMs, RAG, Prompt Engineering, Sentence Transformers, FAISS, TensorFlow (Basics), PyTorch, Scikit-learn, OpenCV" },
    { category: "Backend & Storage", items: "Flask, REST APIs, SQLite, Supabase" },
    { category: "DevOps & Cloud", items: "Docker, Kubernetes (Basics), CI/CD, AWS Basics, Azure, GCP" },
    { category: "Software Engineering", items: "Git, GitHub, Version Control, Testing, Deployment, MLOps Fundamentals" }
  ];

  const hackathonsData = [
    {
      name: "TCS CodeVita - Season 13",
      date: "2025",
      achievement: "Round 1 & Round 2 Qualified",
      details: "Competed in one of the world's largest competitive programming hackathons. Secured a global rank of 386 in Round 2 and 7410 in Round 1."
    },
    {
      name: "QHills Hackathon - Satara",
      date: "Aug 2025",
      achievement: "Team Nova Member",
      details: "Collaborated in a cross-functional team to develop a working prototype of an AI-powered interview simulation platform using OCR, NLP, and Gemini API for question generation/evaluation in 72 hours."
    }
  ];

  return (
    <section 
      id="resume" 
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      
      {/* Visual neon blobs */}
      <div className="absolute left-1/4 top-1/3 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute right-1/4 bottom-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl -z-10" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Professional Resume</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* PDF Download and View Panel */}
        <div className={`p-6 rounded-2xl border glass flex flex-col md:flex-row items-center justify-between gap-6
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <div className="flex items-center space-x-4 text-left">
            <div className={`p-3 rounded-xl border
              ${isDarkMode ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-400' : 'bg-purple-500/5 border-purple-500/20 text-purple-600'}`}
            >
              <FileText size={28} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-100 dark:text-gray-100">Looking for the PDF copy?</h3>
              <p className={`text-xs md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Download or view the official, print-friendly resume.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <a
              href="/Om_Mane_Resume.pdf"
              download="Om_Mane_Resume.pdf"
              className="flex-1 md:flex-initial px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-sm font-semibold rounded-xl flex items-center justify-center space-x-1.5 shadow-md hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <Download size={16} />
              <span>Download PDF</span>
            </a>
            
            <a
              href="/Om_Mane_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 md:flex-initial px-5 py-2.5 border text-sm font-semibold rounded-xl flex items-center justify-center space-x-1.5 transition-all duration-300
                ${isDarkMode 
                  ? 'border-gray-800 hover:border-cyan-400 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400' 
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-500/10 text-gray-700 hover:text-purple-600'
                }`}
            >
              <Eye size={16} />
              <span>View PDF</span>
            </a>
          </div>
        </div>

        {/* Timeline Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-xl glass border border-gray-800/10 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('education')}
            className={`flex-1 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer
              ${activeTab === 'education'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <GraduationCap size={16} />
            <span>Education</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`flex-1 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer
              ${activeTab === 'skills'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/20 shadow-[0_0_10px_rgba(188,59,255,0.15)]'
                : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <Cpu size={16} />
            <span>Skills Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex-1 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer
              ${activeTab === 'experience'
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.15)]'
                : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <Briefcase size={16} />
            <span>Experience</span>
          </button>

          <button
            onClick={() => setActiveTab('hackathons')}
            className={`flex-1 px-4 py-2 text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer
              ${activeTab === 'hackathons'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
              }`}
          >
            <Award size={16} />
            <span>Hackathons</span>
          </button>
        </div>

        {/* Tab Content Areas */}
        <div className="relative min-h-[350px] transition-all duration-500">
          
          {/* EDUCATION TAB */}
          {activeTab === 'education' && (
            <div className="space-y-8 animate-fade-in relative pl-6 border-l border-cyan-500/20 text-left">
              {educationData.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing vertical node indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-cyan-400 bg-cyber-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                  
                  <div className={`p-6 rounded-2xl border glass hover-card space-y-2
                    ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <h4 className="text-lg font-bold text-gray-100 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">
                        {item.degree}
                      </h4>
                      <span className="text-xs font-bold text-cyan-400 uppercase bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20 w-fit">
                        {item.year}
                      </span>
                    </div>
                    <div className={`text-sm font-semibold ${isDarkMode ? 'text-purple-400/80' : 'text-purple-600/80'}`}>
                      {item.institution}
                    </div>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-4 animate-fade-in text-left">
              <div className={`border glass rounded-2xl overflow-hidden
                ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${isDarkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'}`}>
                      <th className="px-6 py-4 font-bold text-gray-100 dark:text-gray-100 text-left w-1/3">Category</th>
                      <th className="px-6 py-4 font-bold text-gray-100 dark:text-gray-100 text-left">Skills Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/10">
                    {skillsData.map((skill, idx) => (
                      <tr key={idx} className="transition-colors hover:bg-purple-500/5 group">
                        <td className="px-6 py-4 font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{skill.category}</td>
                        <td className={`px-6 py-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.items}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* EXPERIENCE TAB */}
          {activeTab === 'experience' && (
            <div className="space-y-8 animate-fade-in relative pl-6 border-l border-pink-500/20 text-left">
              {experienceData.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing vertical node indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-pink-400 bg-cyber-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-pink-400 shadow-[0_0_8px_rgba(236,72,153,0.6)]" />
                  
                  <div className={`p-6 rounded-2xl border glass hover-card space-y-2
                    ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <h4 className="text-lg font-bold text-gray-100 dark:text-gray-100 group-hover:text-pink-400 transition-colors">
                        {item.role}
                      </h4>
                      <span className="text-xs font-bold text-pink-400 uppercase bg-pink-400/10 px-2 py-0.5 rounded border border-pink-400/20 w-fit">
                        {item.period}
                      </span>
                    </div>
                    <div className={`text-sm font-semibold ${isDarkMode ? 'text-cyan-400/80' : 'text-cyan-600/80'}`}>
                      {item.company}
                    </div>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HACKATHONS TAB */}
          {activeTab === 'hackathons' && (
            <div className="space-y-8 animate-fade-in relative pl-6 border-l border-purple-500/20 text-left">
              {hackathonsData.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Glowing vertical node indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-purple-400 bg-cyber-bg transition-all duration-300 group-hover:scale-125 group-hover:bg-purple-400 shadow-[0_0_8px_rgba(188,59,255,0.6)]" />
                  
                  <div className={`p-6 rounded-2xl border glass hover-card space-y-2
                    ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                      <h4 className="text-lg font-bold text-gray-100 dark:text-gray-100 group-hover:text-purple-400 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-xs font-bold text-purple-400 uppercase bg-purple-400/10 px-2 py-0.5 rounded border border-purple-400/20 w-fit">
                        {item.date}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                      {item.achievement}
                    </div>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </section>
  );
};
