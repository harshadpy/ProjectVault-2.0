import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  isDark: boolean;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isDark, message = 'Loading projects...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {/* Main Spinner */}
      <div className="relative">
        <div className={`w-16 h-16 rounded-full border-4 border-t-transparent animate-spin ${
          isDark ? 'border-blue-400' : 'border-blue-500'
        }`} />
        
        {/* Inner Sparkle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className={`h-6 w-6 animate-pulse ${
            isDark ? 'text-blue-400' : 'text-blue-500'
          }`} />
        </div>
        
        {/* Outer Glow */}
        <div className={`absolute inset-0 w-16 h-16 rounded-full animate-ping opacity-20 ${
          isDark ? 'bg-blue-400' : 'bg-blue-500'
        }`} />
      </div>
      
      {/* Loading Text */}
      <p className={`mt-6 text-lg font-medium animate-pulse ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {message}
      </p>
      
      {/* Loading Dots */}
      <div className="flex space-x-1 mt-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full animate-bounce ${
              isDark ? 'bg-blue-400' : 'bg-blue-500'
            }`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;