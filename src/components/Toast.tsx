import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  // Auto close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Define icon and color based on type
  let icon;
  let bgColor;
  let textColor;

  switch (type) {
    case 'success':
      icon = <CheckCircle className="h-5 w-5" />;
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'error':
      icon = <AlertCircle className="h-5 w-5" />;
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'warning':
      icon = <AlertTriangle className="h-5 w-5" />;
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'info':
    default:
      icon = <Info className="h-5 w-5" />;
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
  }

  return (
    <div 
      className={`flex items-center justify-between w-72 p-4 rounded-lg shadow-lg ${bgColor} ${textColor} animate-slide-in-right`}
      role="alert"
    >
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button 
        className={`ml-4 ${textColor} hover:text-opacity-75 focus:outline-none`}
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};