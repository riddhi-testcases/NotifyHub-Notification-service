import React from 'react';
import { NotificationForm } from '../components/NotificationForm';
import { useToast } from '../context/ToastContext';

export const CreateNotification: React.FC = () => {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast('Notification sent successfully!', 'success');
  };
  
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Send Notification</h1>
        <p className="mt-1 text-sm text-gray-500">
          Send instant notifications to users via email, SMS, or in-app channels
        </p>
      </div>
      
      <NotificationForm onSuccess={handleSuccess} />
      
      <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-md font-medium text-blue-800 mb-2">About Notifications</h3>
        <p className="text-sm text-blue-700">
          Notifications are processed instantly through our high-performance queue system. 
          The system will automatically retry failed deliveries up to 3 times to ensure 
          reliable message delivery.
        </p>
      </div>
    </div>
  );
};