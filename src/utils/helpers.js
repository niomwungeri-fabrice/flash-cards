import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export const NOTIFICATION_KEY = 'FlashCards:notifications';

export const generateUID = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

export const getDailyReminderValue = () => {
  return {
    today: "👋🏿 don't forget to do your quiz for today!"
  };
};

export function createNotification() {
  return {
    title: 'Test your knowledge!',
    body: "👋🏿 don't forget to do your quiz for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === false || data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();

            let today = new Date();
            today.setDate(today.getDate());
            today.setHours(13);
            today.setMinutes(35);
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: today,
              repeat: 'day'
            });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
