import { styles } from './AppTabs.web.styles';
import * as componentStyles from './AppTabs.web.styles';
import type { TabTriggerSlotProps, TabListProps } from 'expo-router/ui';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, useColorScheme, View } from 'react-native';

import { Colors } from '@/constants/theme';

import { ExternalLink } from './ExternalLink';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function AppTabs() {
  return (
    <Tabs style={componentStyles.style1}>
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/(tabs)" asChild>
            <TabButton>Vacantes</TabButton>
          </TabTrigger>
          <TabTrigger name="activities" href="/(tabs)/activities" asChild>
            <TabButton>Mis actividades</TabButton>
          </TabTrigger>
          <TabTrigger name="notifications" href="/(tabs)/notifications" asChild>
            <TabButton>Notificaciones</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
      <TabSlot style={componentStyles.style2} />
    </Tabs>
  );
}

// Match the native element ref used by Pressable in React Native 0.88.
type TabButtonProps = Omit<TabTriggerSlotProps, 'ref'> &
  Pick<ComponentProps<typeof Pressable>, 'ref'>;

export function TabButton({ children, isFocused, ...props }: TabButtonProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}
      >
        <ThemedText
          type="small"
          themeColor={isFocused ? 'text' : 'textSecondary'}
        >
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Redarbor
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}
