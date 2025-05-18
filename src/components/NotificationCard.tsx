import React from 'react';
import { Notification } from '../services/api';
import { format } from 'date-fns';
import { Mail, MessageSquare, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';

interface NotificationCardProps {
  notification: Notification;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'sms':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'in-app':
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get status badge based on notification status
  const getStatusBadge = () => {
    switch (notification.status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  // Get priority badge
  const getPriorityBadge = () => {
    switch (notification.priority) {
      case 'high':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case 'normal':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Normal
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Low
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">{getIcon()}</div>
            <h3 className="text-lg font-medium text-gray-900 capitalize">
              {notification.type} Notification
            </h3>
          </div>
          <div>{getStatusBadge()}</div>
        </div>
        
        <p className="text-gray-700 mb-4">{notification.content}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>{format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}</span>
            {getPriorityBadge()}
          </div>
          
          <div className="flex items-center">
            <span className="ml-1">
              {notification.attempts > 0 && (
                `Attempts: ${notification.attempts}/${notification.maxAttempts}`
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};