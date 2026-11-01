import { ActivitiesScreen } from '@/features/activities/screens/activities.screen';
import { useSessionStore } from '@/features/auth/auth.store';
import { Redirect } from 'expo-router';

export default function ActivitiesRoute() {
  const status = useSessionStore((state) => state.status);

  if (status === 'checking') {
    return null;
  }

  if (status !== 'authenticated') {
    return <Redirect href={'/login'} />;
  }

  return <ActivitiesScreen />;
}
