import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Zap, TrendingUp } from 'lucide-react';

interface EnhancedSearchFilterProps {
  isDark: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  years: string[];
  categories: string[];
  resultsCount: number;
}

const EnhancedSearchFilter: React.FC<EnhancedSearchFilterProps> = ({
  isDark,
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  selectedCategory,
  setSelectedCategory,
  years,
  categories,
  resultsCount
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const popularSearches = [
    'AI Projects', 'Robotics', 'Web Development', 'IoT Systems', 'Machine Learning'
  ];

  const quickFilters = [
    { label: 'Latest', value: '2024', icon: Zap },
    { label: 'Popular', value: 'popular', icon: TrendingUp },
    { label: 'AI/ML', value: 'Artificial Intelligence', icon: Search }
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('');
    setSelectedCategory('');
  };

  const hasActiveFilters = searchTerm || selectedYear || selectedCategory;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const suggestions = popularSearches.filter(search => 
        search.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleQuickFilter = (filter: any) => {
    if (filter.value === '2024') {
      setSelectedYear('2024');
    } else if (filter.value === 'popular') {
      // Sort by popularity logic would go here
    } else if (filter.value === 'Artificial Intelligence') {
      setSelectedCategory('Artificial Intelligence');
    }
  };

  return (
    <div className={`relative transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-r from-gray-800/50 via-gray-800/30 to-gray-800/50' 
        : 'bg-gradient-to-r from-white/70 via-white/50 to-white/70'
    } backdrop-blur-xl rounded-2xl border ${
      isDark ? 'border-gray-700/50' : 'border-gray-200/50'
    } shadow-2xl hover:shadow-3xl`}>
      
      {/* Quick Filter Chips */}
      <div className="p-4 border-b border-gray-200/20">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-sm font-semibold ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Quick Filters
          </h3>
          <div className={`text-xs px-2 py-1 rounded-full ${
            isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
          }`}>
            {resultsCount} results
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter, index) => (
            <button
              key={filter.label}
              onClick={() => handleQuickFilter(filter)}
              className={`group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-blue-600/50 hover:text-white'
                  : 'bg-gray-100/50 text-gray-700 hover:bg-blue-500/50 hover:text-white'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <filter.icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Search Bar */}
        <div className="relative mb-6">
          <div className={`relative group ${
            isDark ? 'bg-gray-700/50' : 'bg-white/70'
          } rounded-xl border-2 transition-all duration-300 ${
            isDark ? 'border-gray-600 focus-within:border-blue-500' : 'border-gray-300 focus-within:border-blue-500'
          } focus-within:shadow-lg focus-within:shadow-blue-500/20`}>
            
            <div className="flex items-center p-4">
              <Search className={`h-5 w-5 mr-3 transition-colors duration-300 ${
                isDark ? 'text-gray-400 group-focus-within:text-blue-400' : 'text-gray-500 group-focus-within:text-blue-500'
              }`} />
              
              <input
                type="text"
                placeholder="Search projects, leads, or keywords..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className={`flex-1 bg-transparent text-base placeholder-gray-400 focus:outline-none ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              />
              
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowSuggestions(false);
                  }}
                  className={`p-1 rounded-full transition-colors duration-200 ${
                    isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-2 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } rounded-xl border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              } shadow-xl z-50 overflow-hidden`}>
                {searchSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setShowSuggestions(false);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                      isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Search className="h-4 w-4 text-gray-400" />
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Year Filter */}
          <div className="relative lg:w-48">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={`w-full appearance-none px-4 py-3 pr-10 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white/70 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full appearance-none px-4 py-3 pr-10 rounded-xl border-2 transition-all duration-300 focus:ring-2 focus:ring-offset-2 ${
                isDark
                  ? 'bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                  : 'bg-white/70 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
              }`}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Filter Toggle & Clear */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                isDark
                  ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                  : 'bg-gray-100/50 text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  isDark
                    ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    : 'bg-red-100/50 text-red-600 hover:bg-red-200/50'
                }`}
              >
                <X className="h-4 w-4" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className={`mt-6 flex items-center justify-between text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              resultsCount > 0 ? 'bg-green-400' : 'bg-red-400'
            }`} />
            <span>
              <span className="font-semibold">{resultsCount}</span> project{resultsCount !== 1 ? 's' : ''} found
              {hasActiveFilters && ' with current filters'}
            </span>
          </div>
          
          {hasActiveFilters && (
            <div className="flex items-center space-x-2">
              <span>Active filters:</span>
              <div className="flex space-x-1">
                {searchTerm && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    "{searchTerm}"
                  </span>
                )}
                {selectedYear && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedYear}
                  </span>
                )}
                {selectedCategory && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedCategory.split('/')[0]}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
    </div>
  );
};

export default EnhancedSearchFilter;