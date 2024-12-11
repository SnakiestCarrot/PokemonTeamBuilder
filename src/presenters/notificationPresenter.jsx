export default class NotificationPresenter {
    constructor() {
      this.notificationContainer = null;
      this.init();
    }
  
    init() {
      // Create a container for notifications if it doesn't already exist
      this.notificationContainer = document.getElementById('notification-container');
      if (!this.notificationContainer) {
        this.notificationContainer = document.createElement('div');
        this.notificationContainer.id = 'notification-container';
        document.body.appendChild(this.notificationContainer);
      }
    }
  
    showNotification(message) {
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = message;
  
      this.notificationContainer.appendChild(notification);
  
      // Start fade-out and removal after 3 seconds
      setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('animationend', () => {
          notification.remove();
        });
      }, 9000);
    }
  }
  