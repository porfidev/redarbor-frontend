import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ApiError } from '@/errors';
import { useSessionStore } from '@/features/auth/auth.store';
import {
  useActivities,
  useActivityMutation,
} from '@/features/activities/activities.hooks';
import type { ActivityKind } from '@/features/activities/activities.service';
import { errorMessage } from '@/utils/errorMessage';
import { useDetailStore } from '../detail.store';
import type { Job } from '../jobs.schema';

function JobActions({ job }: { job: Job }) {
  const status = useSessionStore((state) => state.status);
  const applications = useActivities('applications');
  const favorites = useActivities('favorites');
  const apply = useActivityMutation('applications');
  const favorite = useActivityMutation('favorites');
  const [feedback, setFeedback] = useState<string>();
  const applied =
    applications.data?.some((item) => item.id === job.id) ?? false;
  const favorited = favorites.data?.some((item) => item.id === job.id) ?? false;
  const busy = apply.isPending || favorite.isPending;

  function requireLogin() {
    useDetailStore.getState().close();
    router.push({
      pathname: '/login',
      params: { returnTo: `/vacante/${job.id}` },
    });
  }

  async function act(kind: ActivityKind) {
    setFeedback(undefined);
    if (status !== 'authenticated') {
      requireLogin();
      return;
    }
    try {
      const mutation = kind === 'applications' ? apply : favorite;
      await mutation.mutateAsync({
        job,
        action: kind === 'favorites' && favorited ? 'remove' : 'add',
      });
      setFeedback(
        kind === 'applications'
          ? 'Postulación registrada'
          : 'Favoritos actualizados',
      );
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) requireLogin();
      else setFeedback(errorMessage(error));
    }
  }

  return (
    <View>
      <Button
        title={applied ? 'Ya te postulaste' : 'Aplicar'}
        disabled={
          busy ||
          applied ||
          (status === 'authenticated' && !applications.isSuccess)
        }
        onPress={() => {
          void act('applications');
        }}
      />
      <Button
        title={favorited ? 'Quitar favorito' : 'Agregar favorito'}
        disabled={busy || (status === 'authenticated' && !favorites.isSuccess)}
        onPress={() => {
          void act('favorites');
        }}
      />
      {applications.isError || favorites.isError ? (
        <View>
          <Text>{errorMessage(applications.error ?? favorites.error)}</Text>
          <Button
            title="Reintentar actividades"
            onPress={() => {
              void applications.refetch();
              void favorites.refetch();
            }}
          />
        </View>
      ) : null}
      {feedback ? <Text accessibilityRole="alert">{feedback}</Text> : null}
    </View>
  );
}

export { JobActions };
