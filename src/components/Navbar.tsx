import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { GitHub, LinkedIn } from './BrandIcons';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDarkMode, setIsDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking for active state
      const sections = ['home', 'about', 'projects', 'resume', 'achievements'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Resume', id: 'resume' },
    { name: 'Achievements', id: 'achievements' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'glass-navbar py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => scrollTo('home')}
          className="flex items-center cursor-pointer font-display font-extrabold text-2xl tracking-wider select-none"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all duration-300 hover:brightness-125">
            OM
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 ml-1 animate-pulse"></span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`font-medium text-sm tracking-wide transition-all duration-300 hover:text-cyan-400 relative py-1
                ${activeSection === link.id 
                  ? 'text-cyan-400' 
                  : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Controls (Theme, Github, Linkedin) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg border transition-all duration-300 cursor-pointer
              ${isDarkMode 
                ? 'border-gray-800 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]' 
                : 'border-gray-300 hover:border-purple-500 hover:bg-purple-500/10 text-purple-600'
              }`}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Socials */}
          <a
            href="https://github.com/Ommane123"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center
              ${isDarkMode 
                ? 'border-gray-800 hover:border-cyan-400 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400' 
                : 'border-gray-300 hover:border-purple-500 hover:bg-purple-500/10 text-gray-700 hover:text-purple-600'
              }`}
            aria-label="GitHub Profile"
          >
            <GitHub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/om-mane-0797a8263/"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center
              ${isDarkMode 
                ? 'border-gray-800 hover:border-purple-500 hover:bg-purple-500/10 text-gray-300 hover:text-purple-500' 
                : 'border-gray-300 hover:border-cyan-500 hover:bg-cyan-500/10 text-gray-700 hover:text-cyan-600'
              }`}
            aria-label="LinkedIn Profile"
          >
            <LinkedIn size={18} />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center space-x-3">
          {/* Theme Toggle Mobile */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg border transition-all duration-300
              ${isDarkMode ? 'border-gray-800 text-cyan-400' : 'border-gray-300 text-purple-600'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border transition-all duration-300
              ${isDarkMode ? 'border-gray-800 text-gray-300 hover:text-cyan-400' : 'border-gray-300 text-gray-700'}`}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`md:hidden fixed top-[60px] left-0 w-full glass shadow-2xl transition-all duration-500 ease-in-out origin-top overflow-hidden
          ${mobileMenuOpen ? 'max-h-[350px] border-b border-purple-500/20 py-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left font-medium text-base tracking-wide py-1 transition-all duration-300
                ${activeSection === link.id 
                  ? 'text-cyan-400 font-semibold' 
                  : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
            >
              {link.name}
            </button>
          ))}

          <div className="flex items-center space-x-4 pt-4 border-t border-gray-800">
            <a
              href="https://github.com/Ommane123"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <GitHub size={20} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/om-mane-0797a8263/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <LinkedIn size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
