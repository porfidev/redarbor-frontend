import { ApiError } from '@/errors';
import { ErrorCode } from '@/types/ErrorCode';
async function showJobNotification(
  _id: string,
  _delayed = false,
): Promise<void> {
  throw new ApiError(0, ErrorCode.NOTIFICATIONS_UNAVAILABLE);
}
function subscribeNotifications(_onPress: () => void): () => void {
  return () => {};
}
async function consumeNotification(): Promise<string | undefined> {
  return undefined;
}
async function readInitialNotification(): Promise<void> {}
async function acknowledgeNotification(_id: string): Promise<void> {}
export {
  showJobNotification,
  subscribeNotifications,
  consumeNotification,
  acknowledgeNotification,
  readInitialNotification,
};
