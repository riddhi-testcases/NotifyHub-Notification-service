# NotifyHub - Notification Service

A comprehensive notification system that allows sending, managing, and monitoring email, SMS, and in-app notifications.

## Features

- **Multiple Notification Channels**: Support for Email, SMS, and in-app notifications
- **Queue-Based Processing**: Reliable notification delivery with automatic retries
- **User Management**: User profiles with notification preferences
- **Dashboard**: Visualize notification metrics and status
- **Filtering**: Filter notifications by type, status, and more
- **Responsive Design**: Works across all device sizes

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express
- **Queue System**: Custom in-memory queue with retry mechanism
- **Data Storage**: In-memory for demo purposes

## Project Structure

```
.
├── server/                 # Backend code
│   ├── routes/            # API route handlers
│   ├── data/              # Data models and storage
│   ├── queues/            # Queue configuration and processors
│   ├── services/          # Business logic services
│   ├── middleware/        # Express middleware
│   └── index.js           # Server entry point
├── src/                   # Frontend code
│   ├── components/        # Reusable UI components
│   ├── context/          # React context for state management
│   ├── pages/            # Application pages/routes
│   ├── services/         # API services and utilities
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Application entry point
└── package.json          # Project dependencies and scripts
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   This will start both the frontend and backend servers.

## API Endpoints

### Notifications

- `POST /api/notifications`
  - Send a new notification
  - Request body:
    ```json
    {
      "type": "email|sms|in-app",
      "userId": "string",
      "title": "string",
      "content": "string",
      "priority": "low|medium|high"
    }
    ```

- `GET /api/notifications`
  - Get all notifications (admin)
  - Query parameters:
    - `type`: Filter by notification type
    - `status`: Filter by status
    - `userId`: Filter by user

- `GET /api/notifications/:id`
  - Get notification by ID

- `PATCH /api/notifications/:id/status`
  - Update notification status
  - Request body:
    ```json
    {
      "status": "pending|processing|delivered|failed"
    }
    ```

### Users

- `GET /api/users/:id/notifications`
  - Get notifications for a specific user
  - Query parameters:
    - `type`: Filter by notification type
    - `status`: Filter by status

- `GET /api/users`
  - Get all users

- `POST /api/users`
  - Create a new user
  - Request body:
    ```json
    {
      "name": "string",
      "email": "string",
      "phone": "string",
      "preferences": {
        "email": boolean,
        "sms": boolean,
        "inApp": boolean
      }
    }
    ```

- `PATCH /api/users/:id/preferences`
  - Update user notification preferences

## Notification Processing

The system uses a custom in-memory queue implementation with the following features:

- **Automatic Retries**: Failed notifications are automatically retried up to 3 times
- **Exponential Backoff**: Each retry attempt increases the delay between retries
- **Status Tracking**: Notifications are tracked through their lifecycle:
  - `pending`: Initial state
  - `processing`: Currently being sent
  - `delivered`: Successfully sent
  - `failed`: Failed after all retry attempts

## Implementation Notes

- For demonstration purposes, the project uses:
  - In-memory database for data storage
  - Custom in-memory queue for notification processing
  - Simulated notification sending

## License

© 2025 Notify Hub, Inc. Made by Riddhi Chakraborty. All rights reserved.