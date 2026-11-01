import { SessionGuard } from '@/features/auth/components/session-guard';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { QueryProvider } from '@/providers/query-provider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { JobDetailSheet } from '@/features/jobs/components/JobDetailSheet';
import { NotificationBridge } from '@/features/notifications/NotificationBridge';
void SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <AnimatedSplashOverlay />
        <QueryProvider>
          <SessionGuard>
            <BottomSheetModalProvider>
              <Stack>
                <Stack.Screen
                  name={'(tabs)'}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name={'login'}
                  options={{ title: 'Iniciar sesión' }}
                />
                <Stack.Screen
                  name="vacante/[id]"
                  options={{ headerShown: false }}
                />
              </Stack>
              <JobDetailSheet />
              <NotificationBridge />
            </BottomSheetModalProvider>
          </SessionGuard>
        </QueryProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
