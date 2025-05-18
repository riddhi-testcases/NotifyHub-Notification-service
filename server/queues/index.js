import { notificationQueue, setupNotificationQueue } from './notificationQueue.js';

export const setupQueues = () => {
  setupNotificationQueue();
  console.log('All queues have been initialized');
};

export { notificationQueue };