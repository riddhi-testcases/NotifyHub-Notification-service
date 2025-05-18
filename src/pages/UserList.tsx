import React, { useState, useEffect } from 'react';
import { UserCard } from '../components/UserCard';
import { api, User } from '../services/api';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { Users } from 'lucide-react';

export const UserList: React.FC = () => {
  const { users, loading: usersLoading, setCurrentUser, fetchUsers } = useUser();
  const { showToast } = useToast();
  
  const handleUserSelect = (user: User) => {
    setCurrentUser(user);
    showToast(`Selected ${user.name}`, 'info');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="mt-1 text-sm text-gray-500">Select a user to view and manage their notifications</p>
      </div>
      
      {usersLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-5 h-40"></div>
          ))}
        </div>
      ) : users.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onSelect={() => handleUserSelect(user)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
          <p className="text-gray-500">There are no users in the system yet.</p>
        </div>
      )}
    </div>
  );
};