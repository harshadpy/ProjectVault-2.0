import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  projectId: string;
  currentRating: number;
  totalRatings: number;
  userRating?: number | null;
  onRate: (rating: number) => Promise<void>;
  isDark: boolean;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  projectId,
  currentRating,
  totalRatings,
  userRating,
  onRate,
  isDark,
  size = 'sm',
  readonly = false
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [isRating, setIsRating] = useState(false);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const handleStarClick = async (rating: number) => {
    if (readonly || isRating) return;

    try {
      setIsRating(true);
      await onRate(rating);
    } catch (error) {
      console.error('Error rating project:', error);
    } finally {
      setIsRating(false);
    }
  };

  const handleStarHover = (rating: number) => {
    if (!readonly) {
      setHoveredRating(rating);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const getStarColor = (starIndex: number) => {
    const rating = hoveredRating || userRating || 0;
    
    if (starIndex <= rating) {
      return 'text-yellow-400 fill-current';
    } else if (starIndex <= currentRating) {
      return isDark ? 'text-yellow-500/60' : 'text-yellow-400/60';
    } else {
      return isDark ? 'text-gray-600' : 'text-gray-300';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Star Rating Display */}
      <div 
        className="flex items-center space-x-1"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            disabled={readonly || isRating}
            className={`transition-all duration-200 ${
              readonly 
                ? 'cursor-default' 
                : 'cursor-pointer hover:scale-110 transform'
            } ${isRating ? 'opacity-50' : ''}`}
            title={readonly ? undefined : `Rate ${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star 
              className={`${sizeClasses[size]} transition-colors duration-200 ${getStarColor(star)}`}
            />
          </button>
        ))}
      </div>

      {/* Rating Info */}
      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="font-medium">
          {currentRating > 0 ? currentRating.toFixed(1) : '0.0'}
        </span>
        <span className="mx-1">•</span>
        <span>
          {totalRatings} rating{totalRatings !== 1 ? 's' : ''}
        </span>
      </div>

      {/* User Rating Indicator */}
      {userRating && !readonly && (
        <div className={`text-xs px-2 py-1 rounded-full ${
          isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
        }`}>
          Your rating: {userRating}★
        </div>
      )}
    </div>
  );
};

export default StarRating;