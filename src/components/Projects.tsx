import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Bot, Eye, Languages, GitBranch, Search, X, 
  ChevronLeft, ChevronRight, Grid, Clock, Star, GitFork, Check, Sparkles, Gamepad2
} from 'lucide-react';
import { GitHub } from './BrandIcons';

interface Slide {
  title: string;
  description: string;
  illustration: React.ReactNode;
}

interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Web Development' | 'Python' | 'Games';
  technologies: string[];
  description: string;
  detailedDescription: string;
  features: string[];
  github: string;
  repoName?: string;
  live?: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
  isFeatured?: boolean;
  date: string; // YYYY-MM
  dateLabel: string; // e.g. "May 2024"
  cardAnimationType?: 'default' | 'gradient-border' | 'chessboard' | 'gamestore';
  slides: Slide[];
}

// GitHub API Cache Management
interface GitHubStats {
  stars: number;
  forks: number;
}
const statsCache: Record<string, { data: GitHubStats; timestamp: number }> = {};
const CACHE_DURATION = 60 * 60 * 1000; // 1 Hour Cache

// Custom React Hook to Fetch GitHub Stars & Forks
function useGitHubStats(repoName?: string, fallbackStars = 5, fallbackForks = 2) {
  const [stats, setStats] = useState<GitHubStats>({ stars: fallbackStars, forks: fallbackForks });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoName) return;

    const cached = statsCache[repoName];
    const now = Date.now();
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      setStats(cached.data);
      return;
    }

    try {
      const localCachedString = localStorage.getItem(`gh_stats_${repoName}`);
      if (localCachedString) {
        const localCached = JSON.parse(localCachedString);
        if (now - localCached.timestamp < CACHE_DURATION) {
          setStats(localCached.data);
          statsCache[repoName] = localCached;
          return;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }

    setLoading(true);
    fetch(`https://api.github.com/repos/${repoName}`)
      .then((res) => {
        if (!res.ok) throw new Error('API limit or repo not found');
        return res.json();
      })
      .then((data) => {
        const newStats = {
          stars: data.stargazers_count ?? fallbackStars,
          forks: data.forks_count ?? fallbackForks,
        };
        setStats(newStats);
        const cacheEntry = { data: newStats, timestamp: now };
        statsCache[repoName] = cacheEntry;
        try {
          localStorage.setItem(`gh_stats_${repoName}`, JSON.stringify(cacheEntry));
        } catch (e) {
          console.error('Error writing localStorage', e);
        }
      })
      .catch(() => {
        // Fallback is already set in the state
      })
      .finally(() => {
        setLoading(false);
      });
  }, [repoName, fallbackStars, fallbackForks]);

  return { stats, loading };
}

const projectsData: Project[] = [
  {
    id: "chatbot",
    title: "AI Powered Software Support Chatbot",
    category: "AI/ML",
    technologies: ["Python", "Flask", "SQLite", "Ollama", "RAG", "FAISS", "Sentence Transformers", "LLM"],
    description: "Built an AI-powered enterprise chatbot using Retrieval-Augmented Generation, semantic search, vector databases, REST APIs, and locally hosted LLMs with Ollama for intelligent document-based conversations.",
    detailedDescription: "Built an AI-powered enterprise chatbot using Retrieval-Augmented Generation (RAG), semantic search, vector databases, REST APIs, and locally hosted LLMs with Ollama. The chatbot is designed for intelligent, document-based conversations, helping users query and retrieve exact answers from software manuals, internal documentation, and reference sheets.",
    features: [
      "Retrieval-Augmented Generation (RAG) architecture",
      "FAISS Vector database for semantic document indexing",
      "Sentence Transformers for text embeddings",
      "Locally hosted Ollama LLMs for private document chats",
      "Streamlit and Flask API interfaces",
      "SQLite conversation logging and management"
    ],
    github: "https://github.com/Ommane123/chat",
    repoName: "Ommane123/chat",
    live: "https://chatbot1327.streamlit.app",
    icon: <Bot className="text-cyan-400" size={24} />,
    isFeatured: true,
    date: "2024-03",
    dateLabel: "Mar 2024",
    cardAnimationType: "default",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <line x1="20" y1="40" x2="380" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <circle cx="35" cy="22" r="5" fill="#ff5f56"/>
        <circle cx="50" cy="22" r="5" fill="#ffbd2e"/>
        <circle cx="65" cy="22" r="5" fill="#27c93f"/>
        <circle cx="300" cy="110" r="25" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" fill="rgba(0, 240, 255, 0.05)"/>
        <circle cx="300" cy="110" r="10" fill="#00f0ff" />
        <rect x="30" y="60" width="160" height="35" rx="8" fill="rgba(188, 59, 255, 0.1)" stroke="rgba(188, 59, 255, 0.2)" strokeWidth="1"/>
        <text x="40" y="80" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">Query: Fetch docs...</text>
        <rect x="120" y="115" width="130" height="35" rx="8" fill="rgba(0, 240, 255, 0.1)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1"/>
        <text x="130" y="135" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">RAG: FAISS Retrieval</text>
        <path d="M 190 77 L 275 110" stroke="#bc3bff" strokeWidth="1.5" strokeDasharray="4"/>
        <path d="M 275 110 L 250 132" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4"/>
      </svg>
    ),
    slides: [
      {
        title: "RAG System Architecture",
        description: "Document embeddings compiled into FAISS vector space queried at low latency.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="40" y="40" width="80" height="40" rx="6" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.05)"/>
            <text x="52" y="65" fill="#00f0ff" fontSize="10" fontFamily="monospace">PDF Manuals</text>
            <rect x="160" y="40" width="80" height="40" rx="6" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188,59,255,0.05)"/>
            <text x="175" y="65" fill="#bc3bff" fontSize="10" fontFamily="monospace">Embeddings</text>
            <rect x="280" y="40" width="80" height="40" rx="6" stroke="#ff007f" strokeWidth="1.5" fill="rgba(255,0,127,0.05)"/>
            <text x="295" y="65" fill="#ff007f" fontSize="10" fontFamily="monospace">FAISS Index</text>
            <path d="M 120 60 L 160 60 M 240 60 L 280 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <rect x="110" y="120" width="180" height="50" rx="6" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.05)"/>
            <text x="125" y="142" fill="#00f0ff" fontSize="10" fontFamily="monospace">Ollama Local LLM API</text>
            <path d="M 320 80 L 320 145 L 290 145" stroke="#bc3bff" strokeWidth="1.5" strokeDasharray="3"/>
          </svg>
        )
      },
      {
        title: "User Chat Interface Mockup",
        description: "Minimalist chat dashboard displaying instant query evaluation logs.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="20" y="20" width="360" height="160" rx="8" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
            <rect x="35" y="40" width="220" height="30" rx="6" fill="rgba(188, 59, 255, 0.1)" stroke="rgba(188,59,255,0.2)"/>
            <text x="45" y="58" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="monospace">User: How to setup Ollama?</text>
            <rect x="100" y="85" width="265" height="50" rx="6" fill="rgba(0, 240, 255, 0.1)" stroke="rgba(0,240,255,0.2)"/>
            <text x="110" y="103" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="monospace">AI: 1. Run 'ollama run llama3'</text>
            <text x="110" y="118" fill="rgba(255,255,255,0.8)" fontSize="9" fontFamily="monospace">    2. Configure model via local host API.</text>
            <rect x="35" y="150" width="330" height="20" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)"/>
            <text x="45" y="163" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">Type message here...</text>
          </svg>
        )
      },
      {
        title: "Performance & Search Latency",
        description: "Retrieval analysis shows sub-second search times and high accuracy.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <text x="40" y="40" fill="white" fontSize="12" fontWeight="bold">Search Response Speed</text>
            <line x1="60" y1="60" x2="60" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <line x1="60" y1="160" x2="340" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
            <rect x="80" y="100" width="40" height="60" fill="#00f0ff" rx="2"/>
            <text x="80" y="90" fill="#00f0ff" fontSize="9" fontFamily="monospace">0.12s</text>
            <text x="83" y="172" fill="rgba(255,255,255,0.5)" fontSize="9">FAISS</text>
            <rect x="160" y="80" width="40" height="80" fill="#bc3bff" rx="2"/>
            <text x="160" y="70" fill="#bc3bff" fontSize="9" fontFamily="monospace">0.35s</text>
            <text x="162" y="172" fill="rgba(255,255,255,0.5)" fontSize="9">Embed</text>
            <rect x="240" y="115" width="40" height="45" fill="#ff007f" rx="2"/>
            <text x="240" y="105" fill="#ff007f" fontSize="9" fontFamily="monospace">0.08s</text>
            <text x="245" y="172" fill="rgba(255,255,255,0.5)" fontSize="9">SQLite</text>
          </svg>
        )
      }
    ]
  },
  {
    id: "drowsiness",
    title: "Driver Drowsiness Detection System",
    category: "AI/ML",
    technologies: ["Python", "OpenCV", "Machine Learning", "Streamlit", "SQLite"],
    description: "Real-time driver safety system detecting eye closure, yawning, and distraction using computer vision with automated alert mechanisms.",
    detailedDescription: "A real-time driver safety system that uses computer vision and machine learning to detect signs of fatigue or distraction. By tracking eye closure duration, blink frequency, yawning patterns, and head pose, the system issues immediate alert triggers to prevent potential road accidents.",
    features: [
      "Real-time video processing using OpenCV",
      "Facial landmark detection and mapping",
      "Eye Aspect Ratio (EAR) calculation for eye closure tracking",
      "Yawning detection via mouth opening metrics",
      "Audio alerts and safety status indicators",
      "Streamlit performance analysis dashboard"
    ],
    github: "https://github.com/Ommane123",
    repoName: "Ommane123/Driver_Drowsiness_Detection",
    live: "https://ommane123.github.io/Driver_Drowsiness_Detection/",
    icon: <Eye className="text-purple-400" size={24} />,
    date: "2023-11",
    dateLabel: "Nov 2023",
    cardAnimationType: "default",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <path d="M 100 50 L 300 50 L 300 150 L 100 150 Z" stroke="rgba(188, 59, 255, 0.2)" strokeWidth="1"/>
        <circle cx="160" cy="90" r="25" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188, 59, 255, 0.05)"/>
        <circle cx="160" cy="90" r="6" fill="#bc3bff"/>
        <circle cx="240" cy="90" r="25" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.05)"/>
        <circle cx="240" cy="90" r="6" fill="#00f0ff"/>
        <path d="M 140 90 L 180 90 M 160 70 L 160 110" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <path d="M 220 90 L 260 90 M 240 70 L 240 110" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        <rect x="130" y="145" width="140" height="25" rx="6" fill="rgba(255, 95, 86, 0.1)" stroke="#ff5f56" strokeWidth="1"/>
        <text x="145" y="161" fill="#ff5f56" fontSize="10" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">STATUS: DROWSY</text>
      </svg>
    ),
    slides: [
      {
        title: "Facial Landmark Model",
        description: "Dlib standard facial predictor outlines key points across the eyes and jaw.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <path d="M 150 50 C 150 150, 250 150, 250 50" stroke="#bc3bff" strokeWidth="1.5" strokeDasharray="3"/>
            <circle cx="170" cy="70" r="2" fill="#00f0ff"/>
            <circle cx="180" cy="68" r="2" fill="#00f0ff"/>
            <circle cx="190" cy="71" r="2" fill="#00f0ff"/>
            <circle cx="210" cy="71" r="2" fill="#00f0ff"/>
            <circle cx="220" cy="68" r="2" fill="#00f0ff"/>
            <circle cx="230" cy="70" r="2" fill="#00f0ff"/>
            <path d="M 185 110 Q 200 130 215 110" stroke="#ff007f" strokeWidth="1.5" fill="none"/>
            <text x="130" y="160" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">68 Landmarks Tracking active</text>
          </svg>
        )
      },
      {
        title: "Eye Aspect Ratio Analysis",
        description: "Calculates the ratio of eye height vs width to determine closures.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <text x="40" y="40" fill="white" fontSize="12" fontWeight="bold">Eye Aspect Ratio (EAR) Threshold</text>
            <line x1="50" y1="130" x2="350" y2="130" stroke="#ff5f56" strokeWidth="1.5" strokeDasharray="4"/>
            <text x="300" y="125" fill="#ff5f56" fontSize="8" fontFamily="monospace">Sleep Threshold</text>
            <path d="M 50 80 Q 100 70 150 90 T 250 145 T 350 75" stroke="#00f0ff" strokeWidth="2" fill="none"/>
            <circle cx="250" cy="145" r="5" fill="#ff007f"/>
            <text x="240" y="165" fill="#ff007f" fontSize="8" fontFamily="monospace">Drowsy Trigger</text>
          </svg>
        )
      },
      {
        title: "System Alarm Routing",
        description: "When drowsy status stays active for 3+ consecutive seconds, alarms trigger.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <circle cx="100" cy="100" r="30" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.05)"/>
            <text x="78" y="103" fill="#00f0ff" fontSize="8" fontFamily="monospace">Detect Eye</text>
            <circle cx="200" cy="100" r="30" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188,59,255,0.05)"/>
            <text x="180" y="103" fill="#bc3bff" fontSize="8" fontFamily="monospace">Buffer 3.0s</text>
            <circle cx="300" cy="100" r="30" stroke="#ff007f" strokeWidth="1.5" fill="rgba(255,0,127,0.05)"/>
            <text x="282" y="103" fill="#ff007f" fontSize="8" fontFamily="monospace">Sound Alarm</text>
            <path d="M 130 100 L 170 100 M 230 100 L 270 100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          </svg>
        )
      }
    ]
  },
  {
    id: "ttt-ai",
    title: "Tic Tac Toe AI Game",
    category: "Games",
    technologies: ["Python", "Minimax Algorithm", "Alpha-Beta Pruning", "Streamlit", "HTML", "CSS"],
    description: "Developed an intelligent Tic Tac Toe game featuring an unbeatable AI opponent powered by the Minimax algorithm with Alpha-Beta Pruning.",
    detailedDescription: "Developed an intelligent Tic Tac Toe game featuring an unbeatable AI opponent powered by the Minimax algorithm with Alpha-Beta Pruning. The project demonstrates game theory, recursive search algorithms, decision trees, and artificial intelligence concepts while providing an engaging and interactive user experience.",
    features: [
      "Unbeatable AI opponent powered by recursive decision trees",
      "Minimax algorithm implementation with performance depth bounds",
      "Alpha-Beta Pruning optimization to reduce evaluated game states",
      "Interactive Streamlit web game interface",
      "Instant move evaluation metrics display",
      "Win, draw, and terminal game state detection",
      "Restart and AI difficulty settings",
      "Clean, modern, and responsive UI design"
    ],
    github: "https://github.com/Ommane123/Tic-Tac-Toe-AI-Game",
    repoName: "Ommane123/Tic-Tac-Toe-AI-Game",
    live: "https://ommane123.github.io/Tic-Tac-Toe-AI-Game/",
    icon: <Sparkles className="text-pink-400" size={24} />,
    date: "2023-12",
    dateLabel: "Dec 2023",
    cardAnimationType: "chessboard",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <path d="M 50 20 L 50 180 M 100 20 L 100 180 M 150 20 L 150 180 M 200 20 L 200 180 M 250 20 L 250 180 M 300 20 L 300 180 M 350 20 L 350 180" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
        <line x1="160" y1="50" x2="160" y2="150" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="3" />
        <line x1="240" y1="50" x2="240" y2="150" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="3" />
        <line x1="100" y1="83" x2="300" y2="83" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="3" />
        <line x1="100" y1="116" x2="300" y2="116" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="3" />
        <path d="M 185 92 L 215 107 M 215 92 L 185 107" stroke="#bc3bff" strokeWidth="4" strokeLinecap="round" />
        <circle cx="130" cy="66" r="10" stroke="#00f0ff" strokeWidth="4" fill="none"/>
        <path d="M 255 126 L 285 141 M 285 126 L 255 141" stroke="#ff007f" strokeWidth="4" strokeLinecap="round"/>
        <line x1="130" y1="66" x2="270" y2="133" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3"/>
      </svg>
    ),
    slides: [
      {
        title: "Minimax Decision Tree",
        description: "Recursively checks possible paths. Maximizes AI outcomes while minimizing human options.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <circle cx="200" cy="40" r="15" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188,59,255,0.05)"/>
            <text x="189" y="44" fill="#bc3bff" fontSize="10" fontFamily="monospace">Max</text>
            <line x1="185" y1="52" x2="130" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <line x1="215" y1="52" x2="270" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <circle cx="120" cy="110" r="15" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.05)"/>
            <text x="110" y="114" fill="#00f0ff" fontSize="10" fontFamily="monospace">Min</text>
            <circle cx="280" cy="110" r="15" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.05)"/>
            <text x="270" y="114" fill="#00f0ff" fontSize="10" fontFamily="monospace">Min</text>
            <line x1="105" y1="122" x2="70" y2="155" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <line x1="135" y1="122" x2="170" y2="155" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <circle cx="60" cy="170" r="10" stroke="#ff007f" strokeWidth="1" fill="rgba(255,0,127,0.05)"/>
            <text x="56" y="173" fill="#ff007f" fontSize="8" fontFamily="monospace">+1</text>
            <circle cx="180" cy="170" r="10" stroke="#ff007f" strokeWidth="1" fill="rgba(255,0,127,0.05)"/>
            <text x="177" y="173" fill="#ff007f" fontSize="8" fontFamily="monospace">-1</text>
          </svg>
        )
      },
      {
        title: "Alpha-Beta Pruning Efficiency",
        description: "Pruning avoids exploring branches that are guaranteed to yield worse outcomes.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <circle cx="200" cy="40" r="15" stroke="#bc3bff" strokeWidth="1.5"/>
            <line x1="185" y1="52" x2="130" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
            <line x1="215" y1="52" x2="270" y2="90" stroke="#ff5f56" strokeWidth="1.5" strokeDasharray="3"/>
            <circle cx="120" cy="110" r="15" stroke="#00f0ff" strokeWidth="1.5"/>
            <circle cx="280" cy="110" r="15" stroke="#ff5f56" strokeWidth="1.5" strokeDasharray="3"/>
            <text x="273" y="113" fill="#ff5f56" fontSize="14" fontWeight="bold">X</text>
            <text x="250" y="145" fill="#ff5f56" fontSize="9" fontFamily="monospace">PRUNED (No evaluation)</text>
          </svg>
        )
      },
      {
        title: "Interactive Game Dashboard",
        description: "Web deployment featuring simple play controls and AI performance evaluation metrics.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="40" y="30" width="120" height="120" rx="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
            <line x1="80" y1="30" x2="80" y2="150" stroke="rgba(255,255,255,0.15)"/>
            <line x1="120" y1="30" x2="120" y2="150" stroke="rgba(255,255,255,0.15)"/>
            <line x1="40" y1="70" x2="160" y2="70" stroke="rgba(255,255,255,0.15)"/>
            <line x1="40" y1="110" x2="160" y2="110" stroke="rgba(255,255,255,0.15)"/>
            <circle cx="60" cy="50" r="10" stroke="#00f0ff" strokeWidth="2.5" fill="none"/>
            <rect x="180" y="30" width="180" height="120" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)"/>
            <text x="195" y="55" fill="white" fontSize="10" fontWeight="bold">AI Move Metrics</text>
            <text x="195" y="80" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">Nodes Explored: 412</text>
            <text x="195" y="100" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">Pruning savings: 76.4%</text>
            <text x="195" y="120" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">Move Eval Time: 0.003s</text>
          </svg>
        )
      }
    ]
  },
  {
    id: "translation",
    title: "AI Language Translation Tool",
    category: "AI/ML",
    technologies: ["Python", "NLP", "Translation API", "Streamlit"],
    description: "Multilingual AI translation application with automatic language detection and responsive interface.",
    detailedDescription: "An AI-powered multi-language translation tool leveraging state-of-the-art NLP models and Translation APIs. It includes automatic source-language detection and supports translation into 10+ target languages with high speed and translation accuracy.",
    features: [
      "Automatic input language detection",
      "High-accuracy Translation API integrations",
      "Seamless Streamlit web client interface",
      "Interactive language selector and history logs",
      "Fast response latency and BLEU evaluation metrics"
    ],
    github: "https://github.com/Ommane123/Language-Translation-Tool",
    repoName: "Ommane123/Language-Translation-Tool",
    live: "https://ommane123.github.io/Language-Translation-Tool/",
    icon: <Languages className="text-pink-400" size={24} />,
    date: "2024-01",
    dateLabel: "Jan 2024",
    cardAnimationType: "default",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <circle cx="120" cy="100" r="30" stroke="rgba(255, 0, 127, 0.3)" strokeWidth="2" fill="rgba(255, 0, 127, 0.05)"/>
        <text x="110" y="106" fill="#ff007f" fontSize="18" fontWeight="bold">EN</text>
        <circle cx="280" cy="100" r="30" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="2" fill="rgba(0, 240, 255, 0.05)"/>
        <text x="270" y="106" fill="#00f0ff" fontSize="18" fontWeight="bold">FR</text>
        <path d="M 160 90 C 200 70, 200 70, 240 90" stroke="#ff007f" strokeWidth="2" strokeDasharray="3"/>
        <path d="M 240 110 C 200 130, 200 130, 160 110" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3"/>
        <rect x="150" y="145" width="100" height="20" rx="4" fill="rgba(255,255,255,0.05)"/>
        <text x="165" y="158" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">Auto-Detecting...</text>
      </svg>
    ),
    slides: [
      {
        title: "NLP Translation Pipeline",
        description: "Input sentences undergo tokenization, sequence encoding, and language mappings.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="30" y="65" width="80" height="40" rx="4" stroke="#bc3bff" strokeWidth="1.5"/>
            <text x="45" y="88" fill="#bc3bff" fontSize="9" fontFamily="monospace">Text Input</text>
            <rect x="150" y="65" width="100" height="40" rx="4" stroke="#00f0ff" strokeWidth="1.5"/>
            <text x="160" y="88" fill="#00f0ff" fontSize="9" fontFamily="monospace">NLP Translation</text>
            <rect x="290" y="65" width="80" height="40" rx="4" stroke="#ff007f" strokeWidth="1.5"/>
            <text x="302" y="88" fill="#ff007f" fontSize="9" fontFamily="monospace">Translation</text>
            <path d="M 110 85 L 150 85 M 250 85 L 290 85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
          </svg>
        )
      },
      {
        title: "Translation Dashboard UI",
        description: "Streamlit fields with instantaneous translation and clear language toggles.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="40" y="30" width="320" height="130" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)"/>
            <rect x="60" y="50" width="120" height="60" rx="4" fill="rgba(255,255,255,0.05)"/>
            <text x="70" y="70" fill="white" fontSize="9" fontFamily="monospace">Hello my friend</text>
            <rect x="220" y="50" width="120" height="60" rx="4" fill="rgba(0,240,255,0.05)" stroke="rgba(0,240,255,0.2)"/>
            <text x="230" y="70" fill="#00f0ff" fontSize="9" fontFamily="monospace">Bonjour mon ami</text>
            <text x="187" y="85" fill="#bc3bff" fontSize="12">→</text>
          </svg>
        )
      },
      {
        title: "High Performance Metrics",
        description: "Exceptional BLEU score levels coupled with low average API query processing speeds.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <circle cx="130" cy="100" r="35" stroke="#bc3bff" strokeWidth="4" fill="none"/>
            <text x="113" y="104" fill="white" fontSize="12" fontWeight="bold">98%</text>
            <text x="100" y="160" fill="rgba(255,255,255,0.6)" fontSize="10">Accuracies</text>
            <circle cx="270" cy="100" r="35" stroke="#00f0ff" strokeWidth="4" fill="none"/>
            <text x="249" y="104" fill="white" fontSize="12" fontWeight="bold">140ms</text>
            <text x="248" y="160" fill="rgba(255,255,255,0.6)" fontSize="10">Avg Latency</text>
          </svg>
        )
      }
    ]
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    category: "Web Development",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML", "CSS", "JavaScript"],
    description: "Designed and developed a modern, fully responsive personal portfolio website showcasing my skills, projects, achievements, and resume.",
    detailedDescription: "Designed and developed a modern, fully responsive personal portfolio website showcasing my skills, projects, achievements, and resume. The portfolio features smooth animations, interactive UI components, responsive layouts, and a clean user experience inspired by premium developer portfolios. It serves as my professional online presence and highlights my AI/ML journey, software development experience, and technical expertise.",
    features: [
      "Responsive design for desktop, tablet, and mobile devices",
      "Interactive physics-based canvas and cursor-trailing animations",
      "Dynamic project showcases with detailed modal systems",
      "Resume download functionality integrated into custom visual viewer",
      "Social connections with interactive GitHub & LinkedIn tags",
      "Modern dark theme styled with glassmorphism visual templates",
      "Lighthouse-optimized performance parameters and SEO elements"
    ],
    github: "https://github.com/Ommane123/portfolio",
    repoName: "Ommane123/portfolio",
    live: "https://ommane123.github.io/portfolio/",
    icon: <ExternalLink className="text-cyan-400" size={24} />,
    date: "2024-05",
    dateLabel: "May 2024",
    cardAnimationType: "gradient-border",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <line x1="20" y1="40" x2="380" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        <circle cx="35" cy="22" r="5" fill="#ff5f56"/>
        <circle cx="50" cy="22" r="5" fill="#ffbd2e"/>
        <circle cx="65" cy="22" r="5" fill="#27c93f"/>
        <rect x="100" y="60" width="180" height="110" rx="6" stroke="rgba(0, 240, 255, 0.4)" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.05)"/>
        <rect x="250" y="90" width="50" height="80" rx="4" stroke="rgba(188, 59, 255, 0.4)" strokeWidth="1.5" fill="rgba(188, 59, 255, 0.1)"/>
        <circle cx="275" cy="162" r="4" fill="rgba(188, 59, 255, 0.4)"/>
        <circle cx="80" cy="100" r="10" stroke="rgba(255,0,127,0.3)" />
        <polygon points="340,70 350,90 330,90" stroke="rgba(0,240,255,0.3)" fill="none" />
      </svg>
    ),
    slides: [
      {
        title: "Responsive Grid Layouts",
        description: "Engineered responsive scaling metrics mapping components smoothly down to mobile displays.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="60" y="40" width="160" height="120" rx="6" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.02)"/>
            <line x1="70" y1="60" x2="210" y2="60" stroke="rgba(0,240,255,0.3)" strokeWidth="1.5"/>
            <rect x="250" y="60" width="70" height="100" rx="4" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188,59,255,0.05)"/>
            <circle cx="285" cy="150" r="4" fill="#bc3bff"/>
            <text x="140" y="175" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">Responsive Screen Views</text>
          </svg>
        )
      },
      {
        title: "Framer Motion Timeline",
        description: "Smooth animations and spring values optimized to minimize input delays.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <text x="40" y="40" fill="white" fontSize="12" fontWeight="bold">Spring Interpolation Physics</text>
            <path d="M 60 140 C 120 40, 180 180, 340 60" stroke="#ff007f" strokeWidth="2.5" fill="none"/>
            <circle cx="200" cy="115" r="5" fill="#bc3bff" className="animate-ping"/>
            <text x="210" y="115" fill="#bc3bff" fontSize="8" fontFamily="monospace">Stiffness: 100</text>
          </svg>
        )
      },
      {
        title: "Lighthouse Audit Scores",
        description: "Near-perfect 100% metrics across Performance, Accessibility, and SEO structures.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <circle cx="100" cy="90" r="28" stroke="#27c93f" strokeWidth="4" fill="none"/>
            <text x="89" y="94" fill="white" fontSize="11" fontWeight="bold">100</text>
            <text x="75" y="145" fill="rgba(255,255,255,0.6)" fontSize="9">Performance</text>
            <circle cx="200" cy="90" r="28" stroke="#27c93f" strokeWidth="4" fill="none"/>
            <text x="189" y="94" fill="white" fontSize="11" fontWeight="bold">100</text>
            <text x="182" y="145" fill="rgba(255,255,255,0.6)" fontSize="9">Access</text>
            <circle cx="300" cy="90" r="28" stroke="#27c93f" strokeWidth="4" fill="none"/>
            <text x="289" y="94" fill="white" fontSize="11" fontWeight="bold">100</text>
            <text x="290" y="145" fill="rgba(255,255,255,0.6)" fontSize="9">SEO</text>
          </svg>
        )
      }
    ]
  },
  {
    id: "rule-chatbot",
    title: "Rule Based Chatbot",
    category: "Python",
    technologies: ["Python", "NLP"],
    description: "Developed a rule-based chatbot capable of responding to predefined user queries using structured conversational logic.",
    detailedDescription: "Developed a rule-based chatbot capable of responding to predefined user queries using structured conversational logic. The project maps user intents to specific answers using pattern matching, string similarity metrics, and regex criteria.",
    features: [
      "Predefined intent categories mapping",
      "Regex pattern matching and similarity scoring",
      "Structured decision trees for multi-turn dialogues",
      "Failsafe logic for unmapped queries",
      "Clean interactive console/Streamlit interface"
    ],
    github: "https://github.com/Ommane123/Chatbot-with-Rule-Based-Response",
    repoName: "Ommane123/Chatbot-with-Rule-Based-Response",
    live: "https://ommane123.github.io/Chatbot-with-Rule-Based-Response/",
    icon: <GitBranch className="text-blue-400" size={24} />,
    date: "2023-08",
    dateLabel: "Aug 2023",
    cardAnimationType: "default",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
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
    ),
    slides: [
      {
        title: "Query Routing Tree",
        description: "Conditional checks direct questions to specified response arrays instantly.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="150" y="30" width="100" height="30" rx="4" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188,59,255,0.05)"/>
            <text x="165" y="48" fill="#bc3bff" fontSize="9" fontFamily="monospace">Match Intent</text>
            <line x1="150" y1="45" x2="80" y2="100" stroke="rgba(255,255,255,0.2)"/>
            <line x1="250" y1="45" x2="320" y2="100" stroke="rgba(255,255,255,0.2)"/>
            <circle cx="70" cy="110" r="20" stroke="#00f0ff" strokeWidth="1.5"/>
            <text x="60" y="113" fill="#00f0ff" fontSize="8" fontFamily="monospace">Greet</text>
            <circle cx="330" cy="110" r="20" stroke="#ff007f" strokeWidth="1.5"/>
            <text x="320" y="113" fill="#ff007f" fontSize="8" fontFamily="monospace">Exit</text>
          </svg>
        )
      },
      {
        title: "String Similarity Matching",
        description: "Compares edit distances to capture typing errors in user inputs.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <text x="40" y="50" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">Input: 'helo'</text>
            <text x="40" y="80" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">Match: 'hello'</text>
            <rect x="40" y="110" width="320" height="30" rx="4" fill="rgba(0,240,255,0.05)" stroke="rgba(0,240,255,0.2)"/>
            <text x="50" y="128" fill="#00f0ff" fontSize="10" fontFamily="monospace">Levenshtein similarity score: 0.89</text>
          </svg>
        )
      },
      {
        title: "Predefined Responses",
        description: "Organized response directories that return clean dialog results.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="40" y="40" width="320" height="120" rx="6" stroke="rgba(255,255,255,0.15)"/>
            <text x="60" y="70" fill="white" fontSize="10" fontWeight="bold">Fallback responses</text>
            <text x="60" y="100" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">&gt; 'I am not sure I understand.'</text>
            <text x="60" y="125" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">&gt; 'Could you rephrase that query?'</text>
          </svg>
        )
      }
    ]
  },
  {
    id: "gamestore",
    title: "GameStore – Premium Gaming Platform",
    category: "Web Development",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6)", "Web Audio API", "HTML5 Canvas", "Local Storage API"],
    description: "Designed and developed a premium gaming platform interface featuring a modern glassmorphism design, immersive animations, and highly interactive user experiences.",
    detailedDescription: "Designed and developed a premium gaming platform interface featuring a modern glassmorphism design, immersive animations, and highly interactive user experiences. The application includes real-time game searching, category filtering, animated 3D game cards, dynamic particle backgrounds, persistent favorites, interactive game detail modals, and a simulated download system, demonstrating advanced frontend development and creative UI engineering.",
    features: [
      "Premium glassmorphism UI with a futuristic gaming aesthetic",
      "Interactive HTML5 Canvas particle background",
      "3D mouse-responsive game cards with parallax tilt and reflective lighting",
      "Dynamic search and category filtering",
      "Interactive game detail modal with screenshots and hardware requirements",
      "Persistent Favorites system using Local Storage",
      "Simulated game download notifications with animated toast messages",
      "Browser-generated UI sound effects using the Web Audio API",
      "Fully responsive layout for desktop, tablet, and mobile",
      "Optimized animations with smooth performance"
    ],
    github: "https://github.com/Ommane123/first_website",
    repoName: "Ommane123/first_website",
    live: "https://ommane123.github.io/first_website/",
    icon: <Gamepad2 className="text-red-400" size={24} />,
    date: "2024-06",
    dateLabel: "Jun 2024",
    cardAnimationType: "gamestore",
    illustration: (
      <svg viewBox="0 0 400 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="16" fill="#090b11"/>
        <circle cx="80" cy="60" r="3" fill="#ff5f56" opacity="0.6" />
        <circle cx="320" cy="140" r="4" fill="#00f0ff" opacity="0.6" />
        <circle cx="280" cy="50" r="2" fill="#bc3bff" opacity="0.8"/>
        <rect x="50" y="80" width="80" height="90" rx="8" stroke="rgba(255, 95, 86, 0.4)" strokeWidth="1" fill="rgba(255, 95, 86, 0.05)"/>
        <rect x="160" y="70" width="80" height="100" rx="8" stroke="rgba(0, 240, 255, 0.6)" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.1)" />
        <rect x="270" y="80" width="80" height="90" rx="8" stroke="rgba(188, 59, 255, 0.4)" strokeWidth="1" fill="rgba(188, 59, 255, 0.05)"/>
        <path d="M 185 110 C 185 105, 215 105, 215 110 C 215 125, 185 125, 185 110 Z" stroke="#00f0ff" strokeWidth="1.5" fill="none"/>
        <circle cx="192" cy="110" r="2" fill="#bc3bff"/>
        <circle cx="208" cy="110" r="2" fill="#ff007f"/>
        <path d="M 197 115 L 203 115" stroke="white" strokeWidth="1"/>
      </svg>
    ),
    slides: [
      {
        title: "Game Selection Grid",
        description: "Interactive category layout displaying games with 3D hover effects.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <rect x="30" y="40" width="100" height="120" rx="6" stroke="#ff5f56" strokeWidth="1.5" fill="rgba(255,95,86,0.05)"/>
            <rect x="150" y="40" width="100" height="120" rx="6" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0,240,255,0.05)"/>
            <rect x="270" y="40" width="100" height="120" rx="6" stroke="#bc3bff" strokeWidth="1.5" fill="rgba(188,59,255,0.05)"/>
            <circle cx="80" cy="80" r="15" fill="rgba(255,255,255,0.1)"/>
            <circle cx="200" cy="80" r="15" fill="rgba(255,255,255,0.1)"/>
            <circle cx="320" cy="80" r="15" fill="rgba(255,255,255,0.1)"/>
          </svg>
        )
      },
      {
        title: "Hardware Requirements Analyzer",
        description: "Displays client hardware specs and matches with game configuration dynamically.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <text x="40" y="40" fill="white" fontSize="12" fontWeight="bold">Hardware Spec Check</text>
            <rect x="40" y="60" width="320" height="25" rx="4" fill="rgba(255,255,255,0.05)"/>
            <text x="50" y="76" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">GPU: RTX 4070 (Recommended)</text>
            <text x="310" y="76" fill="#27c93f" fontSize="9" fontWeight="bold">PASS</text>
            <rect x="40" y="95" width="320" height="25" rx="4" fill="rgba(255,255,255,0.05)"/>
            <text x="50" y="111" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">RAM: 16 GB (Recommended)</text>
            <text x="310" y="111" fill="#27c93f" fontSize="9" fontWeight="bold">PASS</text>
            <rect x="40" y="130" width="320" height="25" rx="4" fill="rgba(255,255,255,0.05)"/>
            <text x="50" y="146" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">CPU: Core i7 12th Gen</text>
            <text x="310" y="146" fill="#27c93f" fontSize="9" fontWeight="bold">PASS</text>
          </svg>
        )
      },
      {
        title: "Simulated Toast Downloads",
        description: "Plays dynamic sounds and alerts upon successful background game loading triggers.",
        illustration: (
          <svg viewBox="0 0 400 200" className="w-full h-full bg-[#090b11] rounded-xl" fill="none">
            <path d="M 50 150 Q 100 50, 150 120 T 250 80 T 350 130" stroke="#ff007f" strokeWidth="2.5" fill="none"/>
            <rect x="180" y="30" width="180" height="50" rx="8" fill="rgba(39, 201, 63, 0.15)" stroke="#27c93f" strokeWidth="1"/>
            <text x="195" y="50" fill="#27c93f" fontSize="9" fontWeight="bold">DOWNLOAD STARTED</text>
            <text x="195" y="65" fill="rgba(255,255,255,0.7)" fontSize="8">GameStore: Cyberpunk 2077</text>
          </svg>
        )
      }
    ]
  }
];

// Carousel Component
const ProjectCarousel: React.FC<{ slides: Slide[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-cyber-dark/80 border border-gray-800">
      {/* Slide Illustration */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex flex-col items-center justify-center p-4"
          >
            <div className="w-full h-[70%] flex items-center justify-center">
              {slides[currentSlide].illustration}
            </div>
            <div className="w-full h-[30%] px-4 mt-2 text-center">
              <h4 className="text-sm font-bold text-gray-200">{slides[currentSlide].title}</h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{slides[currentSlide].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left/Right Controls */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-cyber-bg/85 border border-gray-800 text-gray-300 hover:text-cyan-400 transition-colors z-10"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-cyber-bg/85 border border-gray-800 text-gray-300 hover:text-cyan-400 transition-colors z-10"
            aria-label="Next Slide"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Slide Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(idx);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide ? 'bg-cyan-400 w-3' : 'bg-gray-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Modal Details Component
const ProjectModal: React.FC<{ project: Project; isDarkMode: boolean; onClose: () => void }> = ({ 
  project, 
  isDarkMode, 
  onClose 
}) => {
  const { stats } = useGitHubStats(project.repoName);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()}
        className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl relative p-6 md:p-8 flex flex-col md:flex-row gap-8 scroll-mt-2
          ${isDarkMode ? 'border-gray-800 bg-[#07080e]/95 text-gray-200' : 'border-gray-200 bg-white/95 text-gray-800'}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800/10 dark:hover:bg-white/10 transition-colors z-20"
          aria-label="Close modal"
        >
          <X size={20} className={isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} />
        </button>

        {/* Left Column: Visual Carousel */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <ProjectCarousel slides={project.slides} />
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-center italic`}>
            Interactive Vector Infographics • Slide between features
          </div>
        </div>

        {/* Right Column: Detailed Text */}
        <div className="w-full md:w-1/2 flex flex-col text-left space-y-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border
                ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-purple-500/10 border-purple-500/20 text-purple-600'}`}>
                {project.category}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border
                ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-200 border-gray-300 text-gray-600'}`}>
                {project.dateLabel}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              {project.title}
            </h3>
          </div>

          {/* GitHub Stars/Forks count */}
          {project.repoName && (
            <div className="flex items-center space-x-3 text-xs font-mono">
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-md border 
                ${isDarkMode ? 'bg-gray-900 border-gray-800 text-yellow-400/80' : 'bg-gray-100 border-gray-200 text-yellow-600'}`}>
                <Star size={12} className="fill-current" />
                <span>{stats.stars} Stars</span>
              </div>
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-md border 
                ${isDarkMode ? 'bg-gray-900 border-gray-800 text-cyan-400/80' : 'bg-gray-100 border-gray-200 text-cyan-600'}`}>
                <GitFork size={12} />
                <span>{stats.forks} Forks</span>
              </div>
            </div>
          )}

          {/* Deep-dive Description */}
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.detailedDescription}
          </p>

          {/* Bulleted Key Features */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Key Features</h4>
            <ul className="space-y-1.5 text-xs">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Badges */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border
                    ${isDarkMode 
                      ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400/80' 
                      : 'bg-purple-500/5 border-purple-500/10 text-purple-600/80'
                    }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-800/10 dark:border-gray-100/10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 border text-xs font-semibold rounded-lg flex items-center space-x-2 transition-all duration-300
                ${isDarkMode 
                  ? 'border-gray-800 hover:border-cyan-400 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400' 
                  : 'border-gray-300 hover:border-purple-500 hover:bg-purple-500/10 text-gray-700 hover:text-purple-600'
                }`}
            >
              <GitHub size={14} />
              <span>View Source Code</span>
            </a>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-semibold rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-cyan-500/15
                  ${project.id === 'gamestore' ? 'animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
              >
                <ExternalLink size={14} />
                <span>{project.id === 'gamestore' ? 'Play Demo' : 'Launch Live Demo'}</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ProjectCard Component
const ProjectCard: React.FC<{ project: Project; isDarkMode: boolean; onOpenDetails: () => void }> = ({ 
  project, 
  isDarkMode, 
  onOpenDetails 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { stats } = useGitHubStats(project.repoName);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    const rotateX = ((y - height / 2) / (height / 2)) * -6;
    const rotateY = ((x - width / 2) / (width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Card Animation custom classes
  const isGradientBorder = project.cardAnimationType === 'gradient-border';
  const isChessboard = project.cardAnimationType === 'chessboard';
  const isGameStore = project.cardAnimationType === 'gamestore';

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenDetails}
      className={`relative rounded-3xl border overflow-hidden transition-all duration-300 group cursor-pointer p-[1px]
        ${isDarkMode 
          ? 'border-gray-800/80 bg-cyber-dark/40 hover:border-cyan-500/20' 
          : 'border-gray-200 bg-white/70 hover:border-purple-500/20'
        }
        ${isGameStore && isHovered ? 'shadow-[0_0_30px_rgba(239,68,68,0.25)] border-red-500/30' : ''}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.015 : 1})`,
        transition: isHovered ? 'none' : 'transform 0.5s ease',
        boxShadow: isHovered 
          ? (isGameStore ? '0 20px 40px rgba(239,68,68,0.25)' : (isDarkMode ? '0 20px 40px rgba(0,240,255,0.06)' : '0 20px 40px rgba(188,59,255,0.06)'))
          : 'none'
      }}
    >
      {/* 1. Gradient Border Animation wrapper on Hover */}
      {isGradientBorder && (
        <div 
          className={`absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-500 transition-opacity duration-500 z-0 animate-gradient-shift bg-[length:400%_400%]
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {isGameStore && (
        <div 
          className={`absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-cyan-500 via-blue-500 via-purple-500 to-red-500 transition-opacity duration-500 z-0 animate-gradient-shift bg-[length:600%_600%]
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Internal Content (needed for gradient border inset overlay) */}
      <div className={`relative w-full h-full rounded-[23px] overflow-hidden flex flex-col z-10
        ${isDarkMode ? 'bg-[#07080e]' : 'bg-white'}`}>
        
        {/* Featured Ribbon */}
        {project.isFeatured && (
          <div className="absolute top-3 right-3 z-30 flex items-center space-x-1 px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full text-[9px] font-bold shadow-md tracking-wider uppercase animate-pulse">
            <Sparkles size={10} />
            <span>Featured Project</span>
          </div>
        )}

        {/* Dynamic Pointer Tracking Glow */}
        {isHovered && !isChessboard && !isGameStore && (
          <div
            className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-300 z-15"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${isDarkMode ? 'rgba(0, 240, 255, 0.15)' : 'rgba(188, 59, 255, 0.15)'}, transparent 80%)`
            }}
          />
        )}

        {/* Reflection sweep passing across the card */}
        {isGameStore && (
          <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden rounded-[23px]">
            <div className="absolute top-0 left-0 w-[50%] h-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] translate-y-[-25%] translate-x-[-150%] animate-sweep" />
          </div>
        )}

        {/* GameStore floating particles */}
        {isGameStore && isHovered && (
          <>
            <motion.div 
              animate={{ y: [-5, -35], x: [0, -10], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
              className="absolute bottom-4 left-6 font-bold text-red-500/50 text-xl pointer-events-none z-20"
            >
              🎮
            </motion.div>
            <motion.div 
              animate={{ y: [0, -45], x: [0, 12], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
              className="absolute bottom-6 right-8 font-bold text-cyan-400/50 text-xl pointer-events-none z-20"
            >
              👾
            </motion.div>
            <motion.div 
              animate={{ y: [-10, -40], x: [0, 6], opacity: [0, 1, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1 }}
              className="absolute top-10 left-1/4 font-bold text-yellow-400/40 text-lg pointer-events-none z-20"
            >
              ⚡
            </motion.div>
            <motion.div 
              animate={{ y: [-6, -32], x: [0, -8], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
              className="absolute top-1/2 right-1/4 font-bold text-purple-400/40 text-lg pointer-events-none z-20"
            >
              ★
            </motion.div>
          </>
        )}

        {/* 2. Chessboard Board Overlay & floating elements */}
        {isChessboard && isHovered && (
          <>
            <div className="absolute inset-0 border border-cyan-500/10 pointer-events-none z-15 bg-[radial-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
            <motion.div 
              animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-[10%] font-bold font-mono text-cyan-400/20 text-3xl select-none pointer-events-none"
            >
              X
            </motion.div>
            <motion.div 
              animate={{ y: [5, -5, 5], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-[10%] font-bold font-mono text-pink-500/20 text-3xl select-none pointer-events-none"
            >
              O
            </motion.div>
          </>
        )}

        {/* Card Illustration */}
        <div className="relative aspect-video overflow-hidden border-b border-gray-800/10 dark:border-gray-800/40">
          <div className={`w-full h-full transition-transform duration-[2000ms] ease-out
            ${isHovered && isGameStore ? 'scale-110' : 'scale-100'}`}
          >
            {project.illustration}
          </div>
          <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60
            ${isDarkMode ? 'from-[#07080e]' : 'from-white'}`} />
          
          {/* Quick action buttons layout overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails();
              }}
              className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-lg shadow-md hover:bg-cyan-400 hover:text-black transition-colors"
            >
              View Details
            </button>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-white hover:text-cyan-400 transition-colors"
              title="GitHub Repository"
            >
              <GitHub size={16} />
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold rounded-lg shadow-md hover:opacity-90 transition-all
                  ${isGameStore ? 'animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.6)]' : ''}`}
                title={isGameStore ? "Play Demo" : "Live Demo"}
              >
                {isGameStore ? 'Play Demo' : 'Live Demo'}
              </a>
            )}
          </div>
        </div>

        {/* Content details */}
        <div className="p-6 space-y-4 text-left flex-grow flex flex-col justify-between">
          <div className="space-y-3">
            {/* Title & Icon & Stars */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className={`text-lg font-bold tracking-tight font-display transition-colors
                  ${isDarkMode 
                    ? 'text-gray-100 group-hover:text-cyan-400' 
                    : 'text-gray-800 group-hover:text-purple-600'
                  }`}
                >
                  {project.title}
                </h3>
                {project.repoName && (
                  <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono text-gray-500">
                    <span className="flex items-center space-x-0.5">
                      <Star size={10} className="fill-current" />
                      <span>{stats.stars}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-0.5">
                      <GitFork size={10} />
                      <span>{stats.forks}</span>
                    </span>
                  </div>
                )}
              </div>
              <div className={`p-1.5 rounded-lg border shrink-0
                ${isDarkMode ? 'bg-gray-800/30 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
                {project.icon}
              </div>
            </div>

            {/* Description */}
            <p className={`text-xs leading-relaxed line-clamp-3
              ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {project.description}
            </p>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border transition-all duration-300
                  ${isDarkMode 
                    ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400/80' 
                    : 'bg-purple-500/5 border-purple-500/10 text-purple-600/80'
                  }
                  ${isGameStore && isHovered ? 'shadow-[0_0_8px_rgba(239,68,68,0.4)] border-red-500/30 text-red-400' : ''}`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border
                ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-gray-200 border-gray-300 text-gray-500'}`}>
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Chronological Timeline View Component
const TimelineView: React.FC<{ 
  projects: Project[]; 
  isDarkMode: boolean; 
  onOpenDetails: (project: Project) => void;
}> = ({ projects, isDarkMode, onOpenDetails }) => {
  // Sort projects chronologically (oldest to newest) to show development journey
  const sortedProjects = [...projects].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="relative max-w-4xl mx-auto py-12 px-4">
      {/* Central Line */}
      <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2
        ${isDarkMode ? 'bg-gradient-to-b from-purple-500/30 via-pink-500/30 to-cyan-400/30' : 'bg-gradient-to-b from-purple-500/20 via-pink-500/20 to-cyan-400/20'}`} 
      />

      <div className="space-y-16">
        {sortedProjects.map((project, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-stretch w-full
                ${isLeft ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Central pulsing circle indicator */}
              <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-cyber-bg flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 animate-ping absolute inset-0" />
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 relative z-10" />
              </div>

              {/* Space filler column for desktop layout grid alignment */}
              <div className="hidden md:block w-1/2" />

              {/* Timeline Card Column */}
              <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                <div 
                  onClick={() => onOpenDetails(project)}
                  className={`p-6 rounded-2xl border text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md
                    ${isDarkMode 
                      ? 'border-gray-800 bg-[#0a0b14]/70 hover:border-cyan-500/30 text-gray-200' 
                      : 'border-gray-200 bg-white/80 hover:border-purple-500/30 text-gray-800'}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-md border
                      ${isDarkMode ? 'bg-cyan-500/5 border-cyan-500/10 text-cyan-400' : 'bg-purple-500/5 border-purple-500/10 text-purple-600'}`}>
                      {project.dateLabel}
                    </span>
                    <span className={`text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border
                      ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-gray-200 border-gray-300 text-gray-600'}`}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display tracking-tight flex items-center space-x-2">
                    <span>{project.title}</span>
                    <span className="shrink-0">{project.icon}</span>
                  </h3>
                  
                  <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`text-[8px] font-bold px-1.5 py-0.5 rounded border
                          ${isDarkMode 
                            ? 'bg-gray-800/40 border-gray-800/60 text-gray-400' 
                            : 'bg-gray-100 border-gray-200 text-gray-600'
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center text-[10px] font-bold tracking-wider uppercase text-cyan-400 hover:text-cyan-300 transition-colors">
                    <span>Read development story</span>
                    <ChevronRight size={12} className="ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Main Projects Page Component
export const Projects: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'AI/ML', 'Web Development', 'Python', 'Games'];

  // Filter project dataset based on active queries
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      
      {/* Background neon light shapes */}
      <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 animate-pulse" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            Interactive Projects Gallery
          </span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto rounded-full" />
      </div>

      {/* Search and Filters Hub */}
      <div className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center">
        
        {/* Search bar */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search title, tech, details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 text-sm rounded-xl border outline-none transition-all duration-300
              ${isDarkMode 
                ? 'bg-cyber-dark/40 border-gray-800 text-gray-100 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)]' 
                : 'bg-white/70 border-gray-200 text-gray-800 focus:border-purple-500/50 focus:shadow-[0_0_15px_rgba(188,59,255,0.08)]'
              }`}
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter categories tabs & view modes */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Categories select pills */}
          <div className={`p-1.5 rounded-xl border flex items-center gap-1 overflow-x-auto max-w-full
            ${isDarkMode ? 'bg-[#0a0b14]/50 border-gray-800' : 'bg-gray-200/50 border-gray-300'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap
                  ${selectedCategory === cat 
                    ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white text-purple-700 shadow-sm') 
                    : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View mode toggle buttons (Grid/Timeline) */}
          <div className={`p-1.5 rounded-xl border flex items-center space-x-1
            ${isDarkMode ? 'bg-[#0a0b14]/50 border-gray-800' : 'bg-gray-200/50 border-gray-300'}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors
                ${viewMode === 'grid' 
                  ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white text-purple-700 shadow-sm') 
                  : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                }`}
              title="Grid view"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-1.5 rounded-lg transition-colors
                ${viewMode === 'timeline' 
                  ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white text-purple-700 shadow-sm') 
                  : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800')
                }`}
              title="Timeline view"
            >
              <Clock size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Dynamic Results Count */}
      <div className="max-w-5xl mx-auto mb-6 text-left text-xs font-mono text-gray-500">
        FOUND {filteredProjects.length} PROJECT{filteredProjects.length !== 1 ? 'S' : ''}
      </div>

      {/* Main content grid or timeline */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`max-w-md mx-auto py-16 rounded-2xl border text-center
              ${isDarkMode ? 'border-gray-800 bg-[#0a0b14]/30 text-gray-400' : 'border-gray-200 bg-gray-50/50 text-gray-600'}`}
          >
            <Search className="mx-auto mb-3 opacity-30" size={32} />
            <h3 className="font-bold">No results found</h3>
            <p className="text-xs mt-1 px-4">Try checking your spelling or adjusting your category filter tags.</p>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="grid-view"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isDarkMode={isDarkMode} 
                onOpenDetails={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="timeline-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TimelineView 
              projects={filteredProjects} 
              isDarkMode={isDarkMode} 
              onOpenDetails={(project) => setSelectedProject(project)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pop-up modal details view */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isDarkMode={isDarkMode}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

    </section>
  );
};
