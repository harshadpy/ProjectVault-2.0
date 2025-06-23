import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, Heart } from 'lucide-react';

interface EnhancedToastProps {
  message: string;
  type: 'success' | 'error' | 'like' | 'unlike';
  isVisible: boolean;
  onClose: () => void;
  isDark: boolean;
}

const EnhancedToast: React.FC<EnhancedToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  isDark 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          gradient: 'from-green-500 to-emerald-500',
          bgColor: isDark ? 'bg-green-900/90' : 'bg-green-50/90',
          borderColor: isDark ? 'border-green-700' : 'border-green-200',
          textColor: isDark ? 'text-green-200' : 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'error':
        return {
          icon: XCircle,
          gradient: 'from-red-500 to-pink-500',
          bgColor: isDark ? 'bg-red-900/90' : 'bg-red-50/90',
          borderColor: isDark ? 'border-red-700' : 'border-red-200',
          textColor: isDark ? 'text-red-200' : 'text-red-800',
          iconColor: 'text-red-500'
        };
      case 'like':
        return {
          icon: Heart,
          gradient: 'from-pink-500 to-red-500',
          bgColor: isDark ? 'bg-pink-900/90' : 'bg-pink-50/90',
          borderColor: isDark ? 'border-pink-700' : 'border-pink-200',
          textColor: isDark ? 'text-pink-200' : 'text-pink-800',
          iconColor: 'text-pink-500'
        };
      case 'unlike':
        return {
          icon: Heart,
          gradient: 'from-gray-500 to-gray-600',
          bgColor: isDark ? 'bg-gray-800/90' : 'bg-gray-50/90',
          borderColor: isDark ? 'border-gray-700' : 'border-gray-200',
          textColor: isDark ? 'text-gray-200' : 'text-gray-800',
          iconColor: 'text-gray-500'
        };
      default:
        return {
          icon: CheckCircle,
          gradient: 'from-blue-500 to-purple-500',
          bgColor: isDark ? 'bg-blue-900/90' : 'bg-blue-50/90',
          borderColor: isDark ? 'border-blue-700' : 'border-blue-200',
          textColor: isDark ? 'text-blue-200' : 'text-blue-800',
          iconColor: 'text-blue-500'
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div className={`fixed top-4 right-4 z-50 transform transition-all duration-500 ${
      isAnimating 
        ? 'translate-x-0 opacity-100 scale-100' 
        : 'translate-x-full opacity-0 scale-95'
    }`}>
      <div className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-2xl max-w-sm ${
        config.bgColor
      } ${config.borderColor}`}>
        
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-10 animate-pulse`} />

        <div className="relative flex items-center space-x-4 p-4">
          {/* Icon with Animation */}
          <div className={`flex-shrink-0 p-2 rounded-full bg-gradient-to-r ${config.gradient} shadow-lg`}>
            <IconComponent className={`h-5 w-5 text-white ${
              type === 'like' ? 'animate-bounce fill-current' : ''
            }`} />
          </div>
          
          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className={`font-medium text-sm ${config.textColor}`}>
              {message}
            </p>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-1 rounded-full transition-all duration-200 hover:scale-110 ${
              isDark 
                ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${config.gradient} transform origin-left transition-transform duration-3000 ease-linear ${
          isAnimating ? 'scale-x-0' : 'scale-x-100'
        }`} />
      </div>
    </div>
  );
};

export default EnhancedToast;