// @flow

import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'BertacchisFlashCards:notifications';

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  await Notifications.cancelAllScheduledNotificationsAsync();
}

function createNotification() {
  return {
    title: '⏰ Study time',
    body: "Let's take a quiz?",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export async function setLocalNotification() {
  const data = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY));
  if (data === null) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18);
      tomorrow.setMinutes(0, 0, 0);

      const nextMinute = new Date();
      nextMinute.setMinutes(nextMinute.getMinutes() + 1);

      await Notifications.scheduleLocalNotificationAsync(createNotification(), {
        // time: tomorrow,
        time: nextMinute,
        repeat: 'day',
      });
      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
}
