import { useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { getJobs } from '@/features/jobs/jobs.service';
import { showJobNotification } from './notifications.service';

function NotificationsScreen() {
  const [message, setMessage] = useState<string>();
  const [busy, setBusy] = useState(false);
  const query = useQuery({
    queryKey: ['notification-sample-job'],
    queryFn: ({ signal }) => getJobs({ limit: 1 }, signal),
  });
  const job = query.data?.items[0];
  async function notify(delayed: boolean) {
    if (!job || busy) return;
    setBusy(true);
    try {
      await showJobNotification(job.id, delayed);
      setMessage(
        delayed
          ? 'Notificación programada. Puedes enviar la app a segundo plano.'
          : 'Notificación enviada.',
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No pudimos enviar la notificación.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <View>
      <Text accessibilityRole="header">Notificaciones locales</Text>
      {Platform.OS === 'web' ? (
        <Text>
          Prueba Notifee en Android o iOS. Aquí puedes verificar el destino del
          enlace.
        </Text>
      ) : null}
      <Text>{job?.title}</Text>
      <Button
        title="Simular nueva vacante"
        disabled={!job || busy || Platform.OS === 'web'}
        onPress={() => {
          void notify(false);
        }}
      />
      <Button
        title="Programar en 10 segundos"
        disabled={!job || busy || Platform.OS === 'web'}
        onPress={() => {
          void notify(true);
        }}
      />
      <Button
        title="Abrir vacante de prueba"
        disabled={!job}
        onPress={() => {
          if (job)
            router.push({ pathname: '/vacante/[id]', params: { id: job.id } });
        }}
      />
      {query.isError ? (
        <Button
          title="Reintentar consultar vacante"
          onPress={() => {
            void query.refetch();
          }}
        />
      ) : null}
      {message ? <Text accessibilityRole="alert">{message}</Text> : null}
    </View>
  );
}

export { NotificationsScreen };
