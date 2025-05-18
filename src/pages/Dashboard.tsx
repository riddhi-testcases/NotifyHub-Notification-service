import React, { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { NotificationCard } from '../components/NotificationCard';
import { UserSelector } from '../components/UserSelector';
import { api, Notification } from '../services/api';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

export const Dashboard: React.FC = () => {
  const { currentUser } = useUser();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
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
  
  // Calculate counts for the stats cards
  const getStatusCount = (status: Notification['status']) => {
    return notifications.filter(n => n.status === status).length;
  };
  
  const getTypeCount = (type: Notification['type']) => {
    return notifications.filter(n => n.type === type).length;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <UserSelector />
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Notifications" 
          value={notifications.length}
          icon={<Bell className="h-5 w-5" />}
        />
        <StatsCard 
          title="Email Notifications" 
          value={getTypeCount('email')}
          icon={<Mail className="h-5 w-5" />}
        />
        <StatsCard 
          title="SMS Notifications" 
          value={getTypeCount('sms')}
          icon={<MessageSquare className="h-5 w-5" />}
        />
        <StatsCard 
          title="In-App Notifications" 
          value={getTypeCount('in-app')}
          icon={<Bell className="h-5 w-5" />}
        />
      </div>
      
      {/* Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Delivered" 
          value={getStatusCount('delivered')}
          icon={<CheckCircle className="h-5 w-5" />}
          bgColor="bg-green-50"
          textColor="text-green-700"
        />
        <StatsCard 
          title="Pending/Processing" 
          value={getStatusCount('pending') + getStatusCount('processing')}
          icon={<Clock className="h-5 w-5" />}
          bgColor="bg-yellow-50"
          textColor="text-yellow-700"
        />
        <StatsCard 
          title="Failed" 
          value={getStatusCount('failed')}
          icon={<XCircle className="h-5 w-5" />}
          bgColor="bg-red-50"
          textColor="text-red-700"
        />
      </div>
      
      {/* Recent Notifications */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Notifications</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-5 h-40"></div>
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notifications.slice(0, 4).map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications yet</h3>
            <p className="text-gray-500">When you receive notifications, they will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};