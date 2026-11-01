import { useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { useDetailStore } from '@/features/jobs/detail.store';

export default function JobDeepLinkRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  useEffect(() => {
    if (typeof id === 'string' && id.trim()) useDetailStore.getState().open(id);
    router.replace('/');
  }, [id]);
  return null;
}
