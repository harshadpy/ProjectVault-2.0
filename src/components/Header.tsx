import React from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleDarkMode: () => void;
  activeTab: 'all' | 'liked';
  setActiveTab: (tab: 'all' | 'liked') => void;
  likedCount: number;
}

const Header: React.FC<HeaderProps> = ({ 
  isDark, 
  toggleDarkMode, 
  activeTab, 
  setActiveTab, 
  likedCount 
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-gray-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                ProjectVault
              </h1>
              <p className={`text-sm transition-colors ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Academic Project Hub
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'all'
                    ? isDark
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-blue-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('liked')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                  activeTab === 'liked'
                    ? isDark
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-emerald-500 text-white shadow-lg'
                    : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Liked Projects
                {likedCount > 0 && (
                  <span className={`absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs font-bold flex items-center justify-center ${
                    activeTab === 'liked'
                      ? 'bg-white text-emerald-600'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {likedCount}
                  </span>
                )}
              </button>
            </nav>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;