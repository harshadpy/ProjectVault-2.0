import React from 'react';
import { Heart, Search, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  isDark: boolean;
  type: 'liked' | 'search';
  searchTerm?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isDark, type, searchTerm }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className={`p-6 rounded-full mb-6 ${
        isDark ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        {type === 'liked' ? (
          <Heart className={`h-12 w-12 ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`} />
        ) : (
          <Search className={`h-12 w-12 ${
            isDark ? 'text-gray-600' : 'text-gray-400'
          }`} />
        )}
      </div>

      <h3 className={`text-xl font-semibold mb-2 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {type === 'liked' 
          ? 'No liked projects yet'
          : `No projects found${searchTerm ? ` for "${searchTerm}"` : ''}`
        }
      </h3>

      <p className={`text-center max-w-md ${
        isDark ? 'text-gray-500' : 'text-gray-500'
      }`}>
        {type === 'liked' 
          ? 'Start exploring projects and click the heart icon to save your favorites here.'
          : 'Try adjusting your search terms or filters to find more projects.'
        }
      </p>

      {type === 'liked' && (
        <div className="flex items-center space-x-2 mt-4 text-sm">
          <Sparkles className={`h-4 w-4 ${
            isDark ? 'text-blue-400' : 'text-blue-500'
          }`} />
          <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>
            Discover amazing academic projects!
          </span>
        </div>
      )}
    </div>
  );
};

export default EmptyState;