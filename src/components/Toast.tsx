import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  isDark: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose, isDark }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border ${
        type === 'success'
          ? isDark
            ? 'bg-green-900/90 border-green-700 text-green-200'
            : 'bg-green-50/90 border-green-200 text-green-800'
          : isDark
            ? 'bg-red-900/90 border-red-700 text-red-200'
            : 'bg-red-50/90 border-red-200 text-red-800'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 flex-shrink-0" />
        )}
        
        <span className="font-medium">{message}</span>
        
        <button
          onClick={onClose}
          className={`p-1 rounded-full transition-colors ${
            type === 'success'
              ? isDark
                ? 'hover:bg-green-800 text-green-300'
                : 'hover:bg-green-100 text-green-600'
              : isDark
                ? 'hover:bg-red-800 text-red-300'
                : 'hover:bg-red-100 text-red-600'
          }`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;