import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
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

const SearchFilter: React.FC<SearchFilterProps> = ({
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
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('');
    setSelectedCategory('');
  };

  const hasActiveFilters = searchTerm || selectedYear || selectedCategory;

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
        : 'bg-white/70 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search projects, leads, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
        </div>

        {/* Year Filter */}
        <div className="lg:w-40">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="lg:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-offset-2 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500'
                : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            }`}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
              isDark
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            <X className="h-4 w-4" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className={`mt-4 text-sm ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {resultsCount} project{resultsCount !== 1 ? 's' : ''} found
        {hasActiveFilters && ' with current filters'}
      </div>
    </div>
  );
};

export default SearchFilter;