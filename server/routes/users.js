import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { users, notifications } from '../data/db.js';

const router = express.Router();

// Get all users (admin only - in a real app, would need auth middleware)
router.get('/', (req, res) => {
  return res.json(users);
});

// Create a new user
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: uuidv4(),
    name,
    email,
    phone: phone || null,
    preferences: {
      email: true,
      sms: phone ? true : false,
      inApp: true
    },
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  return res.status(201).json(newUser);
});

// Get a specific user
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  return res.json(user);
});

// Get notifications for a specific user
router.get('/:id/notifications', (req, res) => {
  const userId = req.params.id;
  
  // Check if user exists
  const userExists = users.some(user => user.id === userId);
  if (!userExists) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Get all notifications for the user
  const userNotifications = notifications.filter(n => n.userId === userId);
  
  return res.json(userNotifications);
});

// Update user notification preferences
router.patch('/:id/preferences', (req, res) => {
  const { email, sms, inApp } = req.body;
  const index = users.findIndex(u => u.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Update preferences
  const updatedPreferences = { ...users[index].preferences };
  
  if (email !== undefined) updatedPreferences.email = Boolean(email);
  if (sms !== undefined) updatedPreferences.sms = Boolean(sms);
  if (inApp !== undefined) updatedPreferences.inApp = Boolean(inApp);
  
  users[index].preferences = updatedPreferences;
  
  return res.json(users[index]);
});

export { router as userRoutes };