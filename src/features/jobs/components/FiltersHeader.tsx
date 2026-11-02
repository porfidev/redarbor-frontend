import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type FiltersHeaderProps = {
  title?: string;
  icon?: ReactNode;
  fontSize?: number;
  onClear?: () => void;
};

function FiltersHeader({
  title = 'Filtros en tiempo real',
  icon = <MaterialCommunityIcons name="tune" size={14} color="#0058BE" />,
  fontSize = 12,
  onClear,
}: FiltersHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        {icon}
        <Text style={[styles.title, { fontSize }]}>{title}</Text>
      </View>

      {onClear && (
        <Pressable
          onPress={onClear}
          accessibilityRole="button"
          accessibilityLabel="Limpiar filtros"
          style={({ pressed }) => [
            styles.clearButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <MaterialCommunityIcons name="restore" size={12} color="#0058BE" />
          <Text style={styles.clearText}>Limpiar filtros</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3FF',
    paddingBottom: 8,
  },
  titleGroup: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    flexShrink: 1,
    color: '#070235',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    includeFontPadding: false,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 24,
  },
  clearText: {
    color: '#0058BE',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    includeFontPadding: false,
  },
});

export { FiltersHeader };
