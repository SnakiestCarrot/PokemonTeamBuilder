export default class NotificationView {
    constructor() {
        this.notificationContainer = this.init();
        this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
        this.performFadeOut = this.performFadeOut.bind(this);
        this.scheduleFadeOut = this.scheduleFadeOut.bind(this);
        this.removeNotification = this.removeNotification.bind(this);
    }

    init() {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
        return container;
    }

    removeNotification(notification) {
        if (notification && notification.parentNode === this.notificationContainer) {
            this.notificationContainer.removeChild(notification);
        }
    }

    handleAnimationEnd(notification, event) {
        if (event === 'fade-out') {
            this.removeNotification(notification);
            notification.removeEventListener('animationend', this.handleAnimationEnd(notification));
        }
    }

    performFadeOut(notification) {
        notification.classList.add('fade-out');
        const boundHandleAnimationEnd = this.handleAnimationEnd.bind(this, notification);
        notification.addEventListener('animationend', boundHandleAnimationEnd);
    }

    // 1 second notification timeout
    displayNotification(message, type) {
        const notification = this.createNotificationElement(message, type);
        this.notificationContainer.appendChild(notification);
        const delay = type === "failure" ? 3000 : 1000;
        this.scheduleFadeOut(notification, delay);
    }    

    createNotificationElement(message, type="success") {
        const notification = document.createElement('div');
        // Apply success or failure class - default assumes success (green notification) and
        // you need to pass type as "failure" for red notification
        notification.className = `notification-${type}`; 
        notification.textContent = message;
        return notification;
    }    

    scheduleFadeOut(notification, delay) {
        const boundPerformFadeOut = this.performFadeOut.bind(this, notification);
        setTimeout(boundPerformFadeOut, delay);
    }
}
