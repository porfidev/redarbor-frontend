import * as componentStyles from '@/styles/TabLayout.styles';
import { OccHeader } from '@/components/OccHeader';
import { SessionGuard } from '@/features/auth/components/SessionGuard';
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AnimatedSplashOverlay } from '@/components/AnimatedIcon';
import { QueryProvider } from '@/providers/QueryProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { JobDetailSheet } from '@/features/jobs/components/JobDetailSheet';
import { NotificationBridge } from '@/features/notifications/NotificationBridge';
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
void SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (fontError) throw fontError;
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={componentStyles.style1}>
      <ThemeProvider value={DefaultTheme}>
        <AnimatedSplashOverlay />
        <QueryProvider>
          <SessionGuard>
            <BottomSheetModalProvider>
              <Stack
                screenOptions={{
                  headerShown: true,
                  header: () => <OccHeader />,
                  contentStyle: {
                    backgroundColor: '#D8E2FF',
                  },
                }}
              >
                <Stack.Screen name={'(tabs)'} />
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
