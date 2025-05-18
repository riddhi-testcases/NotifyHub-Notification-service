import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { notificationRoutes } from './routes/notifications.js';
import { userRoutes } from './routes/users.js';
import { errorHandler } from './middleware/errorHandler.js';
import { setupQueues } from './queues/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Set up middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

// Set up routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Notify Hub API!' });
});

// Error handling middleware
app.use(errorHandler);

// Initialize queues
setupQueues();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;