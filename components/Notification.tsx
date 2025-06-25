
import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { NotificationType } from '../types';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onDismiss: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onDismiss, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, type, duration, onDismiss]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />;
      case 'error':
        return <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />;
      case 'info':
        return <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-800 border-green-600';
      case 'error':
        return 'bg-red-800 border-red-600';
      case 'info':
        return 'bg-blue-800 border-blue-600';
      default:
        return 'bg-gray-700 border-gray-600';
    }
  };

  if (!message) return null;

  return (
    <div 
        className={`fixed top-20 right-5 z-50 p-4 rounded-md shadow-lg border ${getBackgroundColor()} text-gray-100 animate-fadeIn`}
        role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onDismiss}
              className={`inline-flex rounded-md p-1.5 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                type === 'success' ? 'hover:bg-green-700 focus:ring-offset-green-800 focus:ring-green-600' :
                type === 'error' ? 'hover:bg-red-700 focus:ring-offset-red-800 focus:ring-red-600' :
                'hover:bg-blue-700 focus:ring-offset-blue-800 focus:ring-blue-600'
              }`}
              aria-label="Dismiss notification"
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
