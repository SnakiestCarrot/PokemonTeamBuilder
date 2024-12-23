class NotificationView {
    static getNotificationContainer() {
        let container = document.getElementById("notification-container");
        if (!container) {
            container = document.createElement("div");
            container.id = "notification-container";
            document.body.appendChild(container);
        }
        return container;
    }

    static displayNotification(message, type = "success") {
        const container = this.getNotificationContainer();
        const notification = document.createElement("div");
        notification.className = `notification-${type}`;
        notification.textContent = message;

        container.appendChild(notification);

        // Auto-remove notification after 1 second on success and 3
        setTimeout(() => {
            notification.remove();
        }, type === "success" ? 1000 : 3000);
    }
}

export default NotificationView;
