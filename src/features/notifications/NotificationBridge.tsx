import { useEffect } from 'react';
import { AppState } from 'react-native';
import { router, useRootNavigationState } from 'expo-router';
import {
  acknowledgeNotification,
  consumeNotification,
  readInitialNotification,
  subscribeNotifications,
} from './notifications.service';

function NotificationBridge() {
  const navigation = useRootNavigationState();
  useEffect(() => {
    if (!navigation?.key) return;
    let active = true;
    let consuming = false;
    async function consume() {
      if (consuming) return;
      consuming = true;
      try {
        const id = await consumeNotification();
        if (active && id) {
          router.push({ pathname: '/vacante/[id]', params: { id } });
          await acknowledgeNotification(id);
        }
      } finally {
        consuming = false;
      }
    }
    const unsubscribe = subscribeNotifications(() => {
      void consume().catch(() => {});
    });
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void consume().catch(() => {});
    });
    void readInitialNotification()
      .then(consume)
      .catch(() => {});
    return () => {
      active = false;
      unsubscribe();
      subscription.remove();
    };
  }, [navigation?.key]);
  return null;
}

export { NotificationBridge };
