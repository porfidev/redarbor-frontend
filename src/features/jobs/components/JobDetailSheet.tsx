import { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { errorMessage } from '@/utils/errorMessage';
import { ApiError } from '@/errors';
import { useJobSearch, jobKeys } from '../hooks/use-job-search';
import { useDetailStore } from '../detail.store';
import { getJobById } from '../jobs.service';
import { JobCard } from './JobCard';
import { JobActions } from './JobActions';

function JobDetailSheet() {
  const id = useDetailStore((state) => state.id);
  const source = useDetailStore((state) => state.source);
  const sheet = useRef<BottomSheetModal>(null);
  const presented = useRef(false);
  const client = useQueryClient();
  const { width } = useWindowDimensions();
  const translation = useSharedValue(0);
  const locked = useSharedValue(false);
  const search = useJobSearch(source.filters ?? {}, {
    enabled: Boolean(id && source.filters),
    resetOnChange: false,
  });
  const { hasNextPage, isFetchNextPageError, loadMore } = search;
  const jobs = source.filters ? search.jobs : source.jobs;
  const index = jobs.findIndex((job) => job.id === id);
  const initialJob = jobs.find((job) => job.id === id);
  const detail = useQuery({
    queryKey: jobKeys.detail(id ?? ''),
    queryFn: ({ signal }) => getJobById(id ?? '', signal),
    enabled: Boolean(id),
    initialData: initialJob,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (id && !presented.current) {
      presented.current = true;
      sheet.current?.present();
    }
    if (!id && presented.current) sheet.current?.dismiss();
  }, [id]);

  useEffect(() => {
    if (!id || index < 0) return;
    if (
      source.filters &&
      jobs.length - index <= 4 &&
      hasNextPage &&
      !isFetchNextPageError
    ) {
      void loadMore();
    }
    for (const adjacent of [jobs[index - 1], jobs[index + 1]]) {
      if (adjacent) {
        if (!client.getQueryData(jobKeys.detail(adjacent.id))) {
          client.setQueryData(jobKeys.detail(adjacent.id), adjacent, {
            updatedAt: 0,
          });
        }
        void client.prefetchQuery({
          queryKey: jobKeys.detail(adjacent.id),
          queryFn: ({ signal }) => getJobById(adjacent.id, signal),
          staleTime: 30_000,
        });
      }
    }
  }, [
    id,
    index,
    jobs,
    source.filters,
    hasNextPage,
    isFetchNextPageError,
    loadMore,
    client,
  ]);

  function navigate(direction: number) {
    const next = jobs[index + direction];
    if (index >= 0 && next) useDetailStore.getState().move(next.id);
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .failOffsetY([-12, 12])
    .onUpdate((event) => {
      if (!locked.value) translation.value = event.translationX * 0.6;
    })
    .onEnd((event) => {
      const direction = event.translationX < 0 ? 1 : -1;
      const canMove = index >= 0 && Boolean(jobs[index + direction]);
      if (
        !locked.value &&
        canMove &&
        (Math.abs(event.translationX) > width * 0.18 ||
          Math.abs(event.velocityX) > 600)
      ) {
        locked.value = true;
        translation.value = withTiming(
          -direction * width,
          { duration: 140 },
          (finished) => {
            if (finished) scheduleOnRN(navigate, direction);
            translation.value = withTiming(0, { duration: 140 }, () => {
              locked.value = false;
            });
          },
        );
      } else translation.value = withTiming(0, { duration: 180 });
    })
    .onFinalize(() => {
      if (!locked.value) translation.value = withTiming(0, { duration: 180 });
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translation.value }],
  }));

  return (
    <BottomSheetModal
      ref={sheet}
      snapPoints={['60%', '100%']}
      enableDynamicSizing={false}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      onDismiss={() => {
        presented.current = false;
        useDetailStore.getState().close();
      }}
    >
      <GestureDetector gesture={pan}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          <BottomSheetScrollView keyboardShouldPersistTaps="handled">
            <Button
              title="Cerrar detalle"
              onPress={() => useDetailStore.getState().close()}
            />
            {detail.isPending ? (
              <ActivityIndicator accessibilityLabel="Cargando vacante" />
            ) : null}
            {detail.isError ? (
              <View>
                <Text accessibilityRole="alert">
                  {errorMessage(detail.error)}
                </Text>
                <Button
                  title="Reintentar detalle"
                  onPress={() => {
                    void detail.refetch();
                  }}
                />
              </View>
            ) : null}
            {detail.data &&
            !(
              detail.error instanceof ApiError && detail.error.status === 404
            ) ? (
              <View>
                <JobCard job={detail.data} />
                <Text>{detail.data.description}</Text>
                <Text>
                  Publicada:{' '}
                  {new Date(detail.data.publishedAt).toLocaleDateString(
                    'es-MX',
                  )}
                </Text>
                <JobActions key={detail.data.id} job={detail.data} />
              </View>
            ) : null}
            <Button
              title="Vacante anterior"
              disabled={index <= 0}
              onPress={() => navigate(-1)}
            />
            <Button
              title="Vacante siguiente"
              disabled={index < 0 || index >= jobs.length - 1}
              onPress={() => navigate(1)}
            />
            {index >= jobs.length - 1 ? (
              <Text>
                {search.isFetchNextPageError
                  ? 'Fin de resultados disponibles: no pudimos cargar más.'
                  : 'Fin de resultados disponibles.'}
              </Text>
            ) : null}
            {source.filters && search.isFetchNextPageError ? (
              <Button
                title="Reintentar siguientes vacantes"
                onPress={() => {
                  void search.loadMore();
                }}
              />
            ) : null}
          </BottomSheetScrollView>
        </Animated.View>
      </GestureDetector>
    </BottomSheetModal>
  );
}

export { JobDetailSheet };
