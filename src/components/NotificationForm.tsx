import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { api, CreateNotificationRequest } from '../services/api';
import { useUser } from '../context/UserContext';

interface NotificationFormProps {
  onSuccess?: () => void;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({ onSuccess }) => {
  const { showToast } = useToast();
  const { currentUser } = useUser();
  
  const [form, setForm] = useState<CreateNotificationRequest>({
    userId: currentUser?.id || '',
    type: 'email',
    content: '',
    priority: 'normal'
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUserChange = (userId: string) => {
    setForm(prev => ({ ...prev, userId }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.userId) {
      showToast('Please select a user', 'error');
      return;
    }
    
    if (!form.content) {
      showToast('Notification content is required', 'error');
      return;
    }
    
    try {
      setLoading(true);
      await api.notifications.create(form);
      showToast('Notification sent successfully!', 'success');
      
      // Reset form
      setForm({
        userId: form.userId,
        type: 'email',
        content: '',
        priority: 'normal'
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      showToast('Failed to send notification', 'error');
      console.error('Error sending notification:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Send New Notification
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* User Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipient
            </label>
            <select
              name="userId"
              value={form.userId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Select a user</option>
              {currentUser && (
                <option key={currentUser.id} value={currentUser.id}>
                  {currentUser.name} ({currentUser.email})
                </option>
              )}
            </select>
          </div>
          
          {/* Notification Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notification Type
            </label>
            <div className="mt-1 grid grid-cols-3 gap-2">
              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="email"
                  checked={form.type === 'email'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Email</span>
              </label>
              
              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="sms"
                  checked={form.type === 'sms'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">SMS</span>
              </label>
              
              <label className="flex items-center p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="in-app"
                  checked={form.type === 'in-app'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">In-app</span>
              </label>
            </div>
          </div>
          
          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          
          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message Content
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 border py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your notification message here..."
              required
            />
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`
                flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Notification'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};