// API service for interacting with the backend

const API_URL = '/api';

// Generic fetch function with error handling
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const config = {
    ...options,
    headers,
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  preferences: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'email' | 'sms' | 'in-app';
  content: string;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'processing' | 'delivered' | 'failed';
  createdAt: string;
  updatedAt: string;
  attempts: number;
  maxAttempts: number;
}

export interface CreateNotificationRequest {
  userId: string;
  type: 'email' | 'sms' | 'in-app';
  content: string;
  priority?: 'low' | 'normal' | 'high';
}

// API Functions
export const api = {
  // User API
  users: {
    getAll: () => fetchApi<User[]>('/users'),
    getById: (id: string) => fetchApi<User>(`/users/${id}`),
    create: (userData: Partial<User>) => 
      fetchApi<User>('/users', { 
        method: 'POST', 
        body: JSON.stringify(userData) 
      }),
    updatePreferences: (id: string, preferences: Partial<User['preferences']>) => 
      fetchApi<User>(`/users/${id}/preferences`, { 
        method: 'PATCH', 
        body: JSON.stringify(preferences) 
      }),
    getNotifications: (id: string) => 
      fetchApi<Notification[]>(`/users/${id}/notifications`),
  },
  
  // Notification API
  notifications: {
    getAll: () => fetchApi<Notification[]>('/notifications'),
    getById: (id: string) => 
      fetchApi<Notification>(`/notifications/${id}`),
    create: (notification: CreateNotificationRequest) => 
      fetchApi<{id: string, message: string}>('/notifications', { 
        method: 'POST', 
        body: JSON.stringify(notification) 
      }),
    updateStatus: (id: string, status: Notification['status']) => 
      fetchApi<Notification>(`/notifications/${id}/status`, { 
        method: 'PATCH', 
        body: JSON.stringify({ status }) 
      }),
  }
};
