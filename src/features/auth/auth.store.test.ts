import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSessionStore } from './auth.store';
import { beforeEach, expect, test } from '@jest/globals';

const user = { id: '1', name: 'Test', email: 'test@occ.com.mx' };

beforeEach(async () => {
  await AsyncStorage.clear();
  useSessionStore.setState({
    accessToken: undefined,
    user: undefined,
    status: 'checking',
  });
});

test('persists credentials without persisting authenticated status', async () => {
  useSessionStore.getState().setSession({ accessToken: 'token', user });
  const saved = await AsyncStorage.getItem('redarbor-session');
  expect(JSON.parse(saved ?? '{}').state).toEqual({
    accessToken: 'token',
    user,
  });
  expect(useSessionStore.getState().status).toBe('authenticated');
});

test('clears persisted credentials on logout', async () => {
  useSessionStore.getState().setSession({ accessToken: 'token', user });
  useSessionStore.getState().clearSession();
  expect(useSessionStore.getState()).toMatchObject({
    accessToken: undefined,
    user: undefined,
    status: 'anonymous',
  });
  expect(
    JSON.parse((await AsyncStorage.getItem('redarbor-session')) ?? '{}').state,
  ).toEqual({});
});

test('hydration restores credentials but still requires server validation', async () => {
  await AsyncStorage.setItem(
    'redarbor-session',
    JSON.stringify({
      version: 1,
      state: { accessToken: 'saved', user, status: 'authenticated' },
    }),
  );
  await useSessionStore.persist.rehydrate();
  expect(useSessionStore.getState()).toMatchObject({
    accessToken: 'saved',
    status: 'checking',
  });
});

test('rejects corrupt persisted data', async () => {
  await AsyncStorage.setItem(
    'redarbor-session',
    JSON.stringify({ version: 1, state: { accessToken: 123, user } }),
  );
  await useSessionStore.persist.rehydrate();
  expect(useSessionStore.getState().accessToken).toBeUndefined();
});
