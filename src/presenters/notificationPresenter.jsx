import NotificationView from '../views/notificationView';

export default class NotificationPresenter {
  constructor() {
    this.view = new NotificationView();
  }

  showNotification(message) {
    this.view.displayNotification(message);
  }
}
