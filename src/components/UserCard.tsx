import React from 'react';
import { User } from '../services/api';
import { Mail, MessageSquare, Bell, User as UserIcon } from 'lucide-react';

interface UserCardProps {
  user: User;
  onSelect?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Notification Preferences</h4>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <Mail className={`h-4 w-4 ${user.preferences.email ? 'text-blue-500' : 'text-gray-300'}`} />
              <span className="ml-1 text-xs text-gray-600">
                {user.preferences.email ? 'Email enabled' : 'Email disabled'}
              </span>
            </div>
            
            <div className="flex items-center">
              <MessageSquare className={`h-4 w-4 ${user.preferences.sms ? 'text-green-500' : 'text-gray-300'}`} />
              <span className="ml-1 text-xs text-gray-600">
                {user.preferences.sms ? 'SMS enabled' : 'SMS disabled'}
              </span>
            </div>
            
            <div className="flex items-center">
              <Bell className={`h-4 w-4 ${user.preferences.inApp ? 'text-purple-500' : 'text-gray-300'}`} />
              <span className="ml-1 text-xs text-gray-600">
                {user.preferences.inApp ? 'In-app enabled' : 'In-app disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};