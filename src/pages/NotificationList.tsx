import React, { useState, useEffect } from 'react';
import { NotificationCard } from '../components/NotificationCard';
import { UserSelector } from '../components/UserSelector';
import { api, Notification } from '../services/api';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { Bell, Filter } from 'lucide-react';

export const NotificationList: React.FC = () => {
  const { currentUser } = useUser();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
  });
  
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        const userNotifications = await api.users.getNotifications(currentUser.id);
        setNotifications(userNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        showToast('Failed to load notifications', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [currentUser]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Apply filters
  const filteredNotifications = notifications.filter(notification => {
    if (filters.type !== 'all' && notification.type !== filters.type) return false;
    if (filters.status !== 'all' && notification.status !== filters.status) return false;
    return true;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <UserSelector />
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center mb-2">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type-filter"
              name="type"
              className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={filters.type}
              onChange={handleFilterChange}
            >
              <option value="all">All Types</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="in-app">In-App</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status-filter"
              name="status"
              className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Notifications */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-5 h-40"></div>
          ))}
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications found</h3>
          <p className="text-gray-500">
            {notifications.length > 0 
              ? 'Try changing your filters to see more results.' 
              : 'When you receive notifications, they will appear here.'}
          </p>
        </div>
      )}
    </div>
  );
};