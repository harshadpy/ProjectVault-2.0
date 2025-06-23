import React, { useState, useEffect } from 'react';
import { Search, Sparkles, TrendingUp, Users, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  isDark: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  isDark, 
  searchTerm, 
  setSearchTerm, 
  onSearch 
}) => {
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
    'Academic Excellence',
    'Innovation Hub',
    'Research Gateway',
    'Knowledge Portal'
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentPhrase.length) {
          setTypewriterText(currentPhrase.slice(0, typewriterText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(typewriterText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterText, currentIndex, isDeleting]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20' 
            : 'bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-indigo-50/50'
        }`} />

        {/* Academic Icons - Reduced and Simplified */}
        <div className="absolute top-20 left-10 opacity-10 animate-bounce">
          <BookOpen className="h-16 w-16 text-blue-500" />
        </div>
        <div className="absolute top-32 right-20 opacity-10 animate-bounce delay-1000">
          <Users className="h-12 w-12 text-purple-500" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-10 animate-bounce delay-2000">
          <TrendingUp className="h-14 w-14 text-indigo-500" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline with Typewriter Effect */}
        <div className="mb-8">
          <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ProjectVault
            </span>
          </h1>
          <div className="h-16 flex items-center justify-center">
            <h2 className={`text-2xl md:text-4xl font-semibold ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Your Gateway to{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {typewriterText}
                </span>
                <span className="animate-pulse">|</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover, explore, and get inspired by cutting-edge academic projects from 
          <span className="font-semibold text-blue-600"> Vidyalankar Institute of Technology</span> students.
        </p>

        {/* Enhanced Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className={`relative group ${
            isDark ? 'bg-gray-800/50' : 'bg-white/70'
          } backdrop-blur-lg rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
            isDark ? 'border-gray-700 hover:border-blue-500' : 'border-gray-200 hover:border-blue-400'
          }`}>
            <div className="flex items-center p-4">
              <Search className={`h-6 w-6 mr-4 transition-colors duration-300 ${
                isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-500 group-hover:text-blue-500'
              }`} />
              <input
                type="text"
                placeholder="Search projects, leads, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`flex-1 bg-transparent text-lg placeholder-gray-400 focus:outline-none ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              />
              <button
                onClick={onSearch}
                className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
              >
                Search
              </button>
            </div>
            
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform overflow-hidden">
            <span className="relative z-10 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Explore Projects
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </button>
          
          <button className={`group px-8 py-4 border-2 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform ${
            isDark 
              ? 'border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400' 
              : 'border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600'
          }`}>
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </span>
          </button>
        </div>

        {/* Stats Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Active Projects', value: '50+', icon: BookOpen },
            { label: 'Students', value: '5000+', icon: Users },
            { label: 'Categories', value: '15+', icon: Sparkles },
            { label: 'Success Rate', value: '95%', icon: TrendingUp }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className={`group p-4 rounded-xl transition-all duration-500 hover:scale-110 transform ${
                isDark ? 'bg-gray-800/30 hover:bg-gray-800/50' : 'bg-white/30 hover:bg-white/50'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-2 transition-colors duration-300 ${
                isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'
              }`} />
              <div className={`text-2xl font-bold mb-1 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;