import React, { createContext, useState, useEffect, useContext } from 'react';
import { api, User } from '../services/api';

interface UserContextType {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  setCurrentUser: (user: User | null) => void;
  fetchUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  setCurrentUser: () => {},
  fetchUsers: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await api.users.getAll();
      setUsers(fetchedUsers);
      
      // If no current user is set and we have users, set the first one as current
      if (!currentUser && fetchedUsers.length > 0) {
        setCurrentUser(fetchedUsers[0]);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider 
      value={{ 
        currentUser, 
        users, 
        loading, 
        error,
        setCurrentUser,
        fetchUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
