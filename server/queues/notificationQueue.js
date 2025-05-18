import { notifications } from '../data/db.js';
import { 
  sendEmailNotification, 
  sendSmsNotification, 
  sendInAppNotification 
} from '../services/notificationService.js';

// In-memory queue implementation
class NotificationQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  async add(notification) {
    this.queue.push({
      ...notification,
      attempts: 0,
      maxAttempts: this.maxRetries
    });
    
    if (!this.processing) {
      this.process();
    }
  }

  async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const notification = this.queue.shift();
    
    try {
      console.log(`Processing notification ${notification.id} of type ${notification.type}`);
      
      // Find notification in our "database"
      const index = notifications.findIndex(n => n.id === notification.id);
      if (index === -1) {
        throw new Error('Notification not found');
      }
      
      // Update notification status
      notifications[index].status = 'processing';
      notifications[index].attempts += 1;
      notifications[index].updatedAt = new Date().toISOString();
      
      // Send notification based on type
      let result;
      switch (notification.type) {
        case 'email':
          result = await sendEmailNotification(notification);
          break;
        case 'sms':
          result = await sendSmsNotification(notification);
          break;
        case 'in-app':
          result = await sendInAppNotification(notification);
          break;
        default:
          throw new Error(`Invalid notification type: ${notification.type}`);
      }
      
      // Update notification status
      notifications[index].status = 'delivered';
      notifications[index].updatedAt = new Date().toISOString();
      
      console.log(`Notification ${notification.id} sent successfully`);
    } catch (error) {
      console.error(`Error processing notification ${notification.id}:`, error.message);
      
      const index = notifications.findIndex(n => n.id === notification.id);
      if (index !== -1) {
        notifications[index].updatedAt = new Date().toISOString();
        
        // Retry logic
        if (notification.attempts < notification.maxAttempts) {
          notification.attempts += 1;
          setTimeout(() => {
            this.queue.push(notification);
          }, this.retryDelay * notification.attempts);
          notifications[index].status = 'pending';
        } else {
          notifications[index].status = 'failed';
          console.error(`Max attempts reached for notification ${notification.id}`);
        }
      }
    }

    // Process next notification
    setTimeout(() => this.process(), 100);
  }
}

const notificationQueue = new NotificationQueue();

const setupNotificationQueue = () => {
  console.log('In-memory notification queue initialized');
};

export { notificationQueue, setupNotificationQueue };