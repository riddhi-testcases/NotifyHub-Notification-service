import React from 'react';
import { BellRing, User, Settings } from 'lucide-react';
import { useUser } from '../context/UserContext';

export const Header: React.FC = () => {
  const { currentUser } = useUser();
  
  return (
    <header className="bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <BellRing className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-blue-600">NotifyHub</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">View notifications</span>
              <BellRing className="h-6 w-6" />
            </button>
            
            <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Settings</span>
              <Settings className="h-6 w-6" />
            </button>
            
            <div className="flex items-center">
              <span className="hidden md:block mr-2 text-sm font-medium text-gray-700">
                {currentUser?.name || 'Guest'}
              </span>
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};