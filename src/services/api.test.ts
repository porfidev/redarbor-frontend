import { z } from 'zod';
import { apiRequest, configureApiSession } from './api';
import { ErrorCode } from '@/types/ErrorCode';
import { afterAll, beforeEach, expect, jest, test } from '@jest/globals';

jest.mock('@/config/env', () => ({ env: { apiBaseUrl: 'http://api.test/' } }));

const fetchMock =
  jest.fn<(input: unknown, init?: unknown) => Promise<Response>>();
const originalFetch = globalThis.fetch;
function response(payload: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
  } as Response;
}

beforeEach(() => {
  globalThis.fetch = fetchMock;
  configureApiSession({ getToken: () => undefined, onUnauthorized: () => {} });
});
afterAll(() => {
  globalThis.fetch = originalFetch;
});

test('validates the envelope and injects the token only for authenticated requests', async () => {
  configureApiSession({
    getToken: () => 'test-token',
    onUnauthorized: () => {},
  });
  fetchMock.mockResolvedValue(response({ ok: true, data: { id: '1' } }));
  await expect(
    apiRequest('/auth/me', {
      schema: z.object({ id: z.string() }),
      authenticated: true,
    }),
  ).resolves.toEqual({ id: '1' });
  expect(fetchMock).toHaveBeenCalledWith(
    'http://api.test/auth/me',
    expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer test-token' }),
    }),
  );
});

test('rejects authenticated calls without a token before reaching the network', async () => {
  await expect(
    apiRequest('/auth/me', { schema: z.unknown(), authenticated: true }),
  ).rejects.toMatchObject({ code: ErrorCode.AUTH_REQUIRED });
  expect(fetchMock).not.toHaveBeenCalled();
});

test('reports expired sessions with the token of the failed request', async () => {
  const unauthorized = jest.fn();
  configureApiSession({
    getToken: () => 'expired',
    onUnauthorized: unauthorized,
  });
  fetchMock.mockResolvedValue(
    response(
      { ok: false, error: { code: 'TOKEN_EXPIRED', message: 'Expired' } },
      401,
    ),
  );
  await expect(
    apiRequest('/auth/me', { schema: z.unknown(), authenticated: true }),
  ).rejects.toMatchObject({ code: ErrorCode.TOKEN_EXPIRED });
  expect(unauthorized).toHaveBeenCalledWith('expired');
});

test('rejects data that does not match the supplied schema', async () => {
  fetchMock.mockResolvedValue(response({ ok: true, data: { id: 3 } }));
  await expect(
    apiRequest('/jobs/3', { schema: z.object({ id: z.string() }) }),
  ).rejects.toMatchObject({ code: ErrorCode.INVALID_RESPONSE });
});

test('distinguishes network failures from cancellation', async () => {
  fetchMock.mockRejectedValue(new Error('Offline'));
  await expect(
    apiRequest('/jobs', { schema: z.unknown() }),
  ).rejects.toMatchObject({ code: ErrorCode.NETWORK_ERROR });
  const controller = new AbortController();
  controller.abort();
  const cancelled = new Error('Cancelled');
  fetchMock.mockRejectedValue(cancelled);
  await expect(
    apiRequest('/jobs', { schema: z.unknown(), signal: controller.signal }),
  ).rejects.toBe(cancelled);
});
