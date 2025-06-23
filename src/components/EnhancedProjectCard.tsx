import React, { useState } from 'react';
import { Heart, ExternalLink, Calendar, User, Tag, ThumbsUp } from 'lucide-react';
import { Project } from '../data/projectsData';
import StarRating from './StarRating';
import { useProjectRating } from '../hooks/useProjectRating';

interface EnhancedProjectCardProps {
  project: Project & {
    likes_count?: number;
    average_rating?: number;
    rating_count?: number;
  };
  isDark: boolean;
  isLiked: boolean;
  onToggleLike: (projectId: string) => void;
  onProjectUpdate?: () => void;
}

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ 
  project, 
  isDark, 
  isLiked, 
  onToggleLike,
  onProjectUpdate
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFullAbstract, setShowFullAbstract] = useState(false);
  const { userRating, rateProject } = useProjectRating(project.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onToggleLike(project.id);
  };

  const handleRating = async (rating: number) => {
    try {
      await rateProject(rating);
      // Trigger a refresh of the project data if callback provided
      if (onProjectUpdate) {
        onProjectUpdate();
      }
    } catch (error) {
      console.error('Failed to rate project:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Artificial Intelligence': 'from-purple-500 to-pink-500',
      'Robotics': 'from-blue-500 to-cyan-500',
      'IoT': 'from-green-500 to-teal-500',
      'Web Development': 'from-orange-500 to-red-500',
      'Mobile App': 'from-indigo-500 to-purple-500',
      'Data Science': 'from-yellow-500 to-orange-500',
      'Cybersecurity': 'from-red-500 to-pink-500',
      'Healthcare': 'from-emerald-500 to-green-500',
      'default': 'from-gray-500 to-gray-600'
    };
    
    for (const [key, value] of Object.entries(colors)) {
      if (category.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    return colors.default;
  };

  const categoryGradient = getCategoryColor(project.category);

  const handleViewProject = () => {
    // Create a project detail URL or open LinkedIn profile
    if (project.linkedin) {
      window.open(project.linkedin, '_blank', 'noopener,noreferrer');
    } else {
      // Fallback: could navigate to a project detail page
      console.log(`Viewing project: ${project.title}`);
    }
  };

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 ${
        isDark 
          ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700/50 hover:border-gray-600/70 backdrop-blur-xl' 
          : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50 hover:border-gray-300/70 backdrop-blur-xl'
      } hover:shadow-2xl hover:shadow-blue-500/10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${categoryGradient}`} />

      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          {/* Year Badge with Animation */}
          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            isDark
              ? 'bg-blue-900/50 text-blue-300 group-hover:bg-blue-800/70'
              : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
          }`}>
            <Calendar className="h-3 w-3" />
            <span>{project.year}</span>
          </div>

          {/* Enhanced Like Button */}
          <button
            onClick={handleLikeClick}
            className={`relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isLiked
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                : isDark
                  ? 'bg-gray-700/50 text-gray-400 hover:bg-red-500/20 hover:text-red-400'
                  : 'bg-gray-100/50 text-gray-500 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className={`h-5 w-5 transition-all duration-300 ${
              isLiked ? 'fill-current scale-110' : 'group-hover:scale-110'
            }`} />
            
            {/* Like Animation */}
            {isLiked && (
              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30" />
            )}
          </button>
        </div>

        {/* Project Title */}
        <h3 className={`text-xl font-bold mb-3 leading-tight transition-colors duration-300 ${
          isDark ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-700'
        }`}>
          {project.title}
        </h3>

        {/* Project Lead */}
        <div className={`flex items-center space-x-2 mb-3 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          <div className="relative">
            <User className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <span className="font-medium text-sm">{project.projectLead}</span>
        </div>

        {/* Category with Gradient */}
        <div className="flex items-center mb-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg bg-gradient-to-r ${categoryGradient} text-white text-xs font-medium`}>
            <Tag className="h-3 w-3" />
            <span>{project.category.split('/')[0]}</span>
          </div>
        </div>

        {/* Abstract with Expand/Collapse */}
        <div className="mb-6">
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {showFullAbstract ? project.abstract : `${project.abstract.slice(0, 120)}...`}
          </p>
          {project.abstract.length > 120 && (
            <button
              onClick={() => setShowFullAbstract(!showFullAbstract)}
              className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              {showFullAbstract ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Stats Row - Only Likes */}
        <div className={`flex items-center justify-between mb-6 text-xs ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center space-x-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{project.likes_count || 0} likes</span>
          </div>
        </div>

        {/* Star Rating System */}
        <div className="mb-6">
          <StarRating
            projectId={project.id}
            currentRating={project.average_rating || 0}
            totalRatings={project.rating_count || 0}
            userRating={userRating}
            onRate={handleRating}
            isDark={isDark}
            size="sm"
          />
        </div>

        {/* Functional Action Button */}
        <button
          onClick={handleViewProject}
          className={`group/btn relative inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 overflow-hidden ${
            isDark
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
          } hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105`}
        >
          <span className="relative z-10 flex items-center">
            View Profile
            <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </span>
          
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl bg-gradient-to-r ${categoryGradient}`} 
           style={{ transform: 'scale(1.1)' }} />
    </div>
  );
};

export default EnhancedProjectCard;