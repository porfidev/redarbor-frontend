import { useSessionStore } from '@/features/auth/auth.store';
import { LogoutButton } from '@/features/auth/components/logout-button';
import { useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { JobCard } from '@/features/jobs/components/JobCard';
import type { Job } from '@/features/jobs/jobs.schema';
import { useDetailStore } from '@/features/jobs/detail.store';
import { errorMessage } from '@/utils/errorMessage';
import { useActivities, useActivityMutation } from '../activities.hooks';
import type { ActivityKind } from '../activities.service';

function ActivityRow({
  job,
  kind,
  jobs,
  busy,
  onRemove,
}: {
  job: Job;
  kind: ActivityKind;
  jobs: Job[];
  busy: boolean;
  onRemove: (job: Job) => void;
}) {
  return (
    <View>
      <JobCard
        job={job}
        onOpen={() => useDetailStore.getState().open(job.id, { jobs })}
      />
      <Button
        title={
          kind === 'applications' ? 'Cancelar postulación' : 'Eliminar favorito'
        }
        disabled={busy}
        onPress={() => onRemove(job)}
      />
    </View>
  );
}

function ActivitiesScreen() {
  const user = useSessionStore((state) => state.user);
  const [kind, setKind] = useState<ActivityKind>('applications');
  const query = useActivities(kind);
  const mutation = useActivityMutation(kind);
  const [feedback, setFeedback] = useState<string>();
  async function remove(job: Job) {
    setFeedback(undefined);
    try {
      await mutation.mutateAsync({ job, action: 'remove' });
      setFeedback('Actividad eliminada');
    } catch (error) {
      setFeedback(errorMessage(error));
    }
  }
  return (
    <FlashList
      data={query.data ?? []}
      keyExtractor={(job) => job.id}
      renderItem={({ item }) => (
        <ActivityRow
          job={item}
          kind={kind}
          jobs={query.data ?? []}
          busy={mutation.isPending}
          onRemove={(job) => {
            void remove(job);
          }}
        />
      )}
      extraData={kind}
      ListHeaderComponent={
        <View>
          <Text accessibilityRole="header">Mis actividades</Text>
          <Text>{user?.name}</Text>
          <Button
            title="Postulaciones"
            disabled={kind === 'applications' || mutation.isPending}
            onPress={() => {
              setFeedback(undefined);
              setKind('applications');
            }}
          />
          <Button
            title="Favoritos"
            disabled={kind === 'favorites' || mutation.isPending}
            onPress={() => {
              setFeedback(undefined);
              setKind('favorites');
            }}
          />
          <LogoutButton />
          {feedback ? <Text accessibilityRole="alert">{feedback}</Text> : null}
          {query.isError ? (
            <View>
              <Text accessibilityRole="alert">{errorMessage(query.error)}</Text>
              <Button
                title="Reintentar"
                onPress={() => {
                  void query.refetch();
                }}
              />
            </View>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        query.isPending ? (
          <ActivityIndicator accessibilityLabel="Cargando actividades" />
        ) : !query.isError ? (
          <Text>
            No tienes {kind === 'applications' ? 'postulaciones' : 'favoritos'}.
          </Text>
        ) : null
      }
    />
  );
}

export { ActivitiesScreen };
