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
        if (event.animationName === 'fade-out') {
            this.removeNotification(notification);
            notification.removeEventListener('animationend', this.handleAnimationEndBound(notification));
        }
    }

    performFadeOut(notification) {
        notification.classList.add('fade-out');
        const boundHandleAnimationEnd = this.handleAnimationEnd.bind(this, notification);
        notification.handleAnimationEndBound = boundHandleAnimationEnd;
        notification.addEventListener('animationend', boundHandleAnimationEnd);
    }

    // 1 second notification timeout
    displayNotification(message) {
        const notification = this.createNotificationElement(message);
        this.notificationContainer.appendChild(notification);
        this.scheduleFadeOut(notification, 1000);
    }

    createNotificationElement(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        return notification;
    }

    scheduleFadeOut(notification, delay) {
        const boundPerformFadeOut = this.performFadeOut.bind(this, notification);
        setTimeout(boundPerformFadeOut, delay);
    }
}
