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

      let time;
      if (__DEV__) time = nextMinute;
      else time = tomorrow;

      try {
        await Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time,
          repeat: 'day',
        });
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
      } catch (e) {
        console.warn(
          'A bug in Expo Client 2.11.0 (SDK 33) prevents correct local notification scheduling. See https://github.com/expo/expo/issues/4356. For testing local notifications use standalone app or Expo Client 2.10.6 [Android](https://d1ahtucjixef4r.cloudfront.net/Exponent-2.10.6.apk); [iOS](https://dpq5q02fu5f55.cloudfront.net/Exponent-2.10.0.tar.gz): ',
          e,
        );
      }
    }
  }
}
