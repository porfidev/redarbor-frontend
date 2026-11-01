import { jobIdFromLink, jobLink } from './notification-link';
import { expect, test } from '@jest/globals';
test('round trips a job identifier in the occ deep link', () => {
  expect(jobIdFromLink(jobLink('job 1'))).toBe('job 1');
});
test('rejects unrelated or malformed destinations', () => {
  for (const link of [
    'https://example.com',
    'occ://other/1',
    'occ://vacante/',
    'occ://vacante/1/2',
    'garbage',
  ]) {
    expect(jobIdFromLink(link)).toBeUndefined();
  }
});
