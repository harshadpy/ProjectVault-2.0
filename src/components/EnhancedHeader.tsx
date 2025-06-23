import React, { useState, useEffect } from 'react';
import { BookOpen, Moon, Sun, Menu, X, Sparkles } from 'lucide-react';

interface EnhancedHeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
  activeTab: 'all' | 'liked';
  setActiveTab: (tab: 'all' | 'liked') => void;
  likedCount: number;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ 
  isDark, 
  toggleDarkMode, 
  activeTab, 
  setActiveTab, 
  likedCount 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? isDark 
          ? 'bg-gray-900/95 backdrop-blur-xl border-gray-700/50 shadow-2xl shadow-gray-900/20' 
          : 'bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-2xl shadow-gray-900/10'
        : isDark
          ? 'bg-gray-900/50 backdrop-blur-lg border-gray-700/30'
          : 'bg-white/50 backdrop-blur-lg border-gray-200/30'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group">
            <div className={`relative p-2 rounded-xl transition-all duration-300 transform group-hover:scale-110 ${
              isDark ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
            } shadow-lg group-hover:shadow-xl`}>
              <BookOpen className="h-6 w-6 text-white" />
              
              {/* Sparkle Effect */}
              <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <div className="transition-all duration-300">
              <h1 className={`text-xl font-bold transition-colors ${
                isDark ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'
              }`}>
                ProjectVault
              </h1>
              <p className={`text-sm transition-colors ${
                isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
              }`}>
                Academic Project Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`relative px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'all'
                    ? isDark
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                All Projects
                {activeTab === 'all' && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-blue-700/20 animate-pulse" />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('liked')}
                className={`relative px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'liked'
                    ? isDark
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                }`}
              >
                Liked Projects
                
                {/* Animated Badge */}
                {likedCount > 0 && (
                  <span className={`absolute -top-2 -right-2 h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-300 transform ${
                    activeTab === 'liked'
                      ? 'bg-white text-emerald-600 animate-bounce'
                      : isDark
                        ? 'bg-emerald-500 text-white animate-pulse'
                        : 'bg-emerald-500 text-white animate-pulse'
                  }`}>
                    {likedCount}
                  </span>
                )}
                
                {activeTab === 'liked' && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 animate-pulse" />
                )}
              </button>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 overflow-hidden ${
                isDark
                  ? 'bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50 shadow-lg hover:shadow-yellow-400/20'
                  : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50 shadow-lg hover:shadow-gray-400/20'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative z-10">
                {isDark ? (
                  <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
                ) : (
                  <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
                )}
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                isDark ? 'bg-yellow-400/10' : 'bg-gray-600/10'
              }`} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden absolute top-full left-0 right-0 mt-2 mx-4 rounded-2xl border transition-all duration-300 ${
            isDark 
              ? 'bg-gray-900/95 border-gray-700/50 backdrop-blur-xl' 
              : 'bg-white/95 border-gray-200/50 backdrop-blur-xl'
          } shadow-2xl`}>
            <div className="p-4 space-y-3">
              <button
                onClick={() => {
                  setActiveTab('all');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === 'all'
                    ? isDark
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Projects
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('liked');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-between ${
                  activeTab === 'liked'
                    ? isDark
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500 text-white'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-800'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>Liked Projects</span>
                {likedCount > 0 && (
                  <span className={`h-6 w-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    activeTab === 'liked'
                      ? 'bg-white text-emerald-600'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {likedCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
        isScrolled ? 'w-full opacity-100' : 'w-0 opacity-0'
      }`} />
    </header>
  );
};

export default EnhancedHeader;