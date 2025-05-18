import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { notificationQueue } from '../queues/notificationQueue.js';
import { notifications, users } from '../data/db.js';

const router = express.Router();

// Send a notification
router.post('/', async (req, res) => {
  try {
    const { userId, type, content, priority = 'normal' } = req.body;
    
    // Validate request
    if (!userId || !type || !content) {
      return res.status(400).json({ 
        error: 'Missing required fields - userId, type, and content are required' 
      });
    }
    
    // Check if user exists
    const userExists = users.some(user => user.id === userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if notification type is valid
    if (!['email', 'sms', 'in-app'].includes(type.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Invalid notification type. Must be email, sms, or in-app'
      });
    }
    
    // Create notification object
    const notification = {
      id: uuidv4(),
      userId,
      type: type.toLowerCase(),
      content,
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attempts: 0,
      maxAttempts: 3
    };
    
    // Add to in-memory database
    notifications.push(notification);
    
    // Add to queue
    await notificationQueue.add('processNotification', notification, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
    
    return res.status(201).json({
      id: notification.id,
      message: 'Notification queued successfully',
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
});

// Get all notifications (admin only - in a real app, would need auth middleware)
router.get('/', (req, res) => {
  return res.json(notifications);
});

// Get a specific notification by ID
router.get('/:id', (req, res) => {
  const notification = notifications.find(n => n.id === req.params.id);
  
  if (!notification) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  return res.json(notification);
});

// Update notification status (admin only - in a real app, would need auth middleware)
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  
  if (!status || !['pending', 'sent', 'delivered', 'failed'].includes(status)) {
    return res.status(400).json({ 
      error: 'Invalid status. Must be pending, sent, delivered, or failed' 
    });
  }
  
  const index = notifications.findIndex(n => n.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Notification not found' });
  }
  
  notifications[index].status = status;
  notifications[index].updatedAt = new Date().toISOString();
  
  return res.json(notifications[index]);
});

export { router as notificationRoutes };