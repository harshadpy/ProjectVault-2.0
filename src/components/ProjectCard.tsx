import React from 'react';
import { Heart, ExternalLink, Calendar, User, Tag } from 'lucide-react';
import { Project } from '../data/projectsData';

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  isLiked: boolean;
  onToggleLike: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isDark, 
  isLiked, 
  onToggleLike 
}) => {
  return (
    <div className={`group relative p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600 backdrop-blur-sm' 
        : 'bg-white/80 border-gray-200 hover:border-gray-300 backdrop-blur-sm'
    }`}>
      {/* Like Button */}
      <button
        onClick={() => onToggleLike(project.id)}
        className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
          isLiked
            ? 'bg-red-500 text-white hover:bg-red-600 scale-110'
            : isDark
              ? 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-red-400'
              : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500'
        }`}
        title={isLiked ? 'Remove from liked' : 'Add to liked'}
      >
        <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Year Badge */}
      <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
        isDark
          ? 'bg-blue-900/50 text-blue-300'
          : 'bg-blue-100 text-blue-700'
      }`}>
        <Calendar className="h-3 w-3" />
        <span>{project.year}</span>
      </div>

      {/* Project Title */}
      <h3 className={`text-lg font-bold mb-3 pr-10 leading-tight ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {project.title}
      </h3>

      {/* Project Lead */}
      <div className={`flex items-center space-x-2 mb-3 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        <User className="h-4 w-4" />
        <span className="font-medium text-sm">{project.projectLead}</span>
      </div>

      {/* Category */}
      <div className={`flex items-center space-x-2 mb-4 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <Tag className="h-4 w-4" />
        <span className="text-xs">{project.category}</span>
      </div>

      {/* Abstract */}
      <p className={`text-sm leading-relaxed mb-6 line-clamp-3 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {project.abstract}
      </p>

      {/* LinkedIn Link */}
      <a
        href={project.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
          isDark
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        } hover:shadow-lg transform hover:-translate-y-0.5`}
      >
        <span>View Profile</span>
        <ExternalLink className="h-4 w-4" />
      </a>

      {/* Gradient Overlay for Visual Appeal */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
        isDark
          ? 'bg-gradient-to-br from-blue-600/5 to-purple-600/5'
          : 'bg-gradient-to-br from-blue-500/5 to-purple-500/5'
      }`} />
    </div>
  );
};

export default ProjectCard;