import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { GitHub, LinkedIn } from './BrandIcons';

export const Footer: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Ommane123',
      icon: <GitHub size={20} />,
      color: 'hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/om-mane-0797a8263/',
      icon: <LinkedIn size={20} />,
      color: 'hover:text-purple-400 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(188,59,255,0.4)]'
    },
    {
      name: 'Email',
      url: 'mailto:ommane1327@gmail.com',
      icon: <Mail size={20} />,
      color: 'hover:text-pink-400 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,0,127,0.4)]'
    }
  ];

  return (
    <footer 
      id="footer"
      className={`relative border-t py-12 px-6 md:px-12 z-10 
        ${isDarkMode ? 'border-gray-900 bg-cyber-dark/40' : 'border-gray-200 bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo and statement */}
        <div className="text-center md:text-left">
          <div className="font-display font-extrabold text-xl tracking-wider text-gray-100 dark:text-gray-100 mb-1">
            OM<span className="text-cyan-400">.</span>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            © {new Date().getFullYear()} Om Mane. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center space-x-4">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer
                ${isDarkMode ? 'border-gray-800 text-gray-400 bg-cyber-dark' : 'border-gray-300 text-gray-600 bg-white'}
                ${social.color}
              `}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Back to top button */}
        <div>
          <button
            onClick={scrollToTop}
            className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center group cursor-pointer
              ${isDarkMode 
                ? 'border-gray-800 text-gray-400 bg-cyber-dark hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)]' 
                : 'border-gray-300 text-gray-600 bg-white hover:border-purple-500 hover:text-purple-500 hover:shadow-[0_0_12px_rgba(188,59,255,0.25)]'
              }`}
            aria-label="Back to Top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </footer>
  );
};
