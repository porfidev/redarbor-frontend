import { styles } from './ActivitiesScreen.styles';
import * as componentStyles from './ActivitiesScreen.styles';
import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Button, Pressable, Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { JobCard } from '@/features/jobs/components/JobCard';
import type { Job } from '@/features/jobs/jobs.schema';
import { useDetailStore } from '@/features/jobs/detail.store';
import { errorMessage } from '@/utils/errorMessage';
import { useActivities } from '../hooks/useActivities';
import { useActivityMutation } from '../hooks/useActivityMutation';
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
    <View style={styles.activity}>
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
  const applications = useActivities('applications');
  const favorites = useActivities('favorites');
  const [kind, setKind] = useState<ActivityKind>('applications');
  const query = kind === 'applications' ? applications : favorites;
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
      style={styles.screen}
      contentContainerStyle={componentStyles.style1}
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
          <Text accessibilityRole="header" style={styles.title}>
            Mis Actividades
          </Text>
          <Text style={styles.description}>
            Gestiona el estado de tus postulaciones y vacantes guardadas en
            tiempo real.
          </Text>
          <View style={styles.tabs}>
            {(['applications', 'favorites'] as const).map((tab) => {
              const selected = kind === tab;
              const result = tab === 'applications' ? applications : favorites;
              return (
                <Pressable
                  key={tab}
                  accessibilityRole="tab"
                  accessibilityState={{
                    selected,
                    disabled: mutation.isPending,
                  }}
                  disabled={mutation.isPending}
                  onPress={() => {
                    setFeedback(undefined);
                    setKind(tab);
                  }}
                  style={[styles.tab, selected && styles.activeTab]}
                >
                  <Ionicons
                    name={
                      tab === 'applications'
                        ? 'send-outline'
                        : 'bookmark-outline'
                    }
                    size={19}
                    color={selected ? '#FFFFFF' : '#47464F'}
                  />
                  <Text style={[styles.tabText, selected && styles.activeText]}>
                    {tab === 'applications' ? 'Postulaciones' : 'Favoritos'}
                  </Text>
                  <View style={[styles.count, selected && styles.activeCount]}>
                    <Text
                      style={[styles.countText, selected && styles.activeText]}
                    >
                      {result.isSuccess ? result.data.length : '—'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

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
      ListFooterComponent={
        <View style={componentStyles.style2}>
          <LogoutButton />
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
