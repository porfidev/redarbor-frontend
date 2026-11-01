import { afterAll, beforeEach, expect, jest, test } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import { EventType } from '@notifee/react-native';
import {
  acknowledgeNotification,
  consumeNotification,
  recordNotificationPress,
  subscribeNotifications,
} from './notifications.service';

jest.mock('@notifee/react-native', () => ({
  EventType: { PRESS: 1, ACTION_PRESS: 2 },
  __esModule: true,
  default: {},
}));
const originalModule: unknown = NativeModules.NotifeeApiModule;

beforeEach(async () => {
  NativeModules.NotifeeApiModule = {};
  await AsyncStorage.clear();
});
afterAll(() => {
  NativeModules.NotifeeApiModule = originalModule;
});

test('keeps a notification destination pending until navigation acknowledges it', async () => {
  const listener = jest.fn();
  const unsubscribe = subscribeNotifications(listener);
  await recordNotificationPress({
    type: EventType.PRESS,
    detail: { notification: { id: 'test', data: { jobId: 'job-1' } } },
  });
  expect(listener).toHaveBeenCalledTimes(1);
  expect(await consumeNotification()).toBe('job-1');
  expect(await consumeNotification()).toBe('job-1');
  await acknowledgeNotification('another-job');
  expect(await consumeNotification()).toBe('job-1');
  await acknowledgeNotification('job-1');
  expect(await consumeNotification()).toBeUndefined();
  unsubscribe();
});

test('ignores a press without a job identifier', async () => {
  await recordNotificationPress({
    type: EventType.PRESS,
    detail: { notification: { id: 'invalid' } },
  });
  expect(await consumeNotification()).toBeUndefined();
});
