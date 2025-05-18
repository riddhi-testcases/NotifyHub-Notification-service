import React from 'react';
import { User } from '../services/api';
import { useUser } from '../context/UserContext';

interface UserSelectorProps {
  selectedUserId?: string;
  onUserSelect?: (userId: string) => void;
  label?: string;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUserId,
  onUserSelect,
  label = 'Select User',
}) => {
  const { users, currentUser, setCurrentUser, loading } = useUser();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    
    // If we're in a component that manages its own selected user
    if (onUserSelect) {
      onUserSelect(userId);
    } 
    // Otherwise, update the global current user
    else {
      const selectedUser = users.find(user => user.id === userId);
      if (selectedUser) {
        setCurrentUser(selectedUser);
      }
    }
  };
  
  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>;
  }
  
  return (
    <div className="w-full">
      <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id="user-select"
        className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
        value={selectedUserId || currentUser?.id || ''}
        onChange={handleChange}
      >
        <option value="" disabled>Select a user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.email})
          </option>
        ))}
      </select>
    </div>
  );
};