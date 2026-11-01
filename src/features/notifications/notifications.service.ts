import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import type * as Notifee from '@notifee/react-native';
import { ApiError } from '@/errors';
import { ErrorCode } from '@/types/ErrorCode';
import { jobLink, jobIdFromLink } from './notification-link';

const pendingNotificationKey = 'redarbor-pending-notification';

type NotifeeModule = typeof Notifee;
type Event = Notifee.Event;
const pressListeners = new Set<() => void>();
function getNotifee(): NotifeeModule {
  if (!NativeModules.NotifeeApiModule)
    throw new ApiError(0, ErrorCode.NOTIFICATIONS_UNAVAILABLE);
  // Load only after checking availability: importing Notifee eagerly crashes Expo Go.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('@notifee/react-native') as NotifeeModule;
}

function registerBackgroundNotifications(): void {
  if (NativeModules.NotifeeApiModule) {
    const notifee = getNotifee().default;
    notifee.onBackgroundEvent(recordNotificationPress);
    // Capture iOS cold-start PRESS before session hydration mounts the bridge.
    notifee.onForegroundEvent((event) => {
      void recordNotificationPress(event).catch(() => {});
    });
  }
}

async function recordNotificationPress(event: Event): Promise<void> {
  const { EventType } = getNotifee();
  if (event.type !== EventType.PRESS && event.type !== EventType.ACTION_PRESS)
    return;
  const id = event.detail.notification?.data?.jobId;
  if (typeof id === 'string') {
    await AsyncStorage.setItem(pendingNotificationKey, jobLink(id));
    for (const listener of pressListeners) listener();
  }
}

async function consumeNotification(): Promise<string | undefined> {
  const pending = await AsyncStorage.getItem(pendingNotificationKey);
  if (!pending) return;
  return jobIdFromLink(pending);
}

async function acknowledgeNotification(id: string): Promise<void> {
  const pending = await AsyncStorage.getItem(pendingNotificationKey);
  if (pending && jobIdFromLink(pending) === id)
    await AsyncStorage.removeItem(pendingNotificationKey);
}

function subscribeNotifications(onPress: () => void): () => void {
  pressListeners.add(onPress);
  return () => {
    pressListeners.delete(onPress);
  };
}

let initialRead: Promise<void> | undefined;
async function loadInitialNotification(): Promise<void> {
  if (!NativeModules.NotifeeApiModule) return;
  const { default: notifee, EventType } = getNotifee();
  const initial = await notifee.getInitialNotification();
  if (initial)
    await recordNotificationPress({ type: EventType.PRESS, detail: initial });
}

function readInitialNotification(): Promise<void> {
  initialRead ??= loadInitialNotification();
  return initialRead;
}

async function showJobNotification(id: string, delayed = false): Promise<void> {
  const {
    default: notifee,
    AuthorizationStatus,
    AndroidImportance,
    TriggerType,
  } = getNotifee();
  const permission = await notifee.requestPermission();
  if (permission.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
    throw new ApiError(0, ErrorCode.NOTIFICATIONS_DISABLED);
  }
  const channelId = await notifee.createChannel({
    id: 'vacantes',
    name: 'Nuevas vacantes',
    importance: AndroidImportance.HIGH,
  });
  const notification = {
    title: 'Nueva vacante para ti',
    body: 'Toca para consultar la oportunidad.',
    data: { jobId: id, url: jobLink(id) },
    android: {
      channelId,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher',
    },
    ios: {
      foregroundPresentationOptions: { banner: true, list: true, sound: true },
    },
  };
  if (delayed) {
    await notifee.createTriggerNotification(notification, {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 10_000,
    });
  } else await notifee.displayNotification(notification);
}

export {
  showJobNotification,
  subscribeNotifications,
  consumeNotification,
  acknowledgeNotification,
  readInitialNotification,
  recordNotificationPress,
  registerBackgroundNotifications,
};
