// In-memory database for demo purposes
// In a production environment, you would use a real database

// Users collection
export const users = [
  {
    id: '1',
    name: 'Riddhi Chakraborty',
    email: 'riddhi@example.com',
    phone: '+1234567890',
    preferences: {
      email: true,
      sms: true,
      inApp: true
    },
    createdAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    preferences: {
      email: true,
      sms: false,
      inApp: true
    },
    createdAt: '2025-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: null,
    preferences: {
      email: true,
      sms: false,
      inApp: true
    },
    createdAt: '2025-01-03T00:00:00.000Z'
  }
];

// Notifications collection
export const notifications = [
  {
    id: '1',
    userId: '1',
    type: 'email',
    content: 'Welcome to NotifyHub!',
    priority: 'normal',
    status: 'delivered',
    createdAt: '2025-01-05T10:00:00.000Z',
    updatedAt: '2025-01-05T10:01:00.000Z',
    attempts: 1,
    maxAttempts: 3
  },
  {
    id: '2',
    userId: '1',
    type: 'sms',
    content: 'Your account has been verified',
    priority: 'high',
    status: 'delivered',
    createdAt: '2025-01-06T15:30:00.000Z',
    updatedAt: '2025-01-06T15:31:00.000Z',
    attempts: 1,
    maxAttempts: 3
  },
  {
    id: '3',
    userId: '2',
    type: 'in-app',
    content: 'You have a new message',
    priority: 'normal',
    status: 'delivered',
    createdAt: '2025-01-07T09:15:00.000Z',
    updatedAt: '2025-01-07T09:15:00.000Z',
    attempts: 1,
    maxAttempts: 3
  }
];