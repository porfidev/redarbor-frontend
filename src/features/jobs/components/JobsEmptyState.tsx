import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type JobsEmptyStateProps = {
  onClear: () => void;
};

export function JobsEmptyState({ onClear }: JobsEmptyStateProps) {
  return (
    <View style={styles.card}>
      <View style={styles.illustration}>
        <View style={styles.iconFrame}>
          <Ionicons name="briefcase-outline" size={48} color="#0058BE" />
        </View>
        <View style={styles.badge}>
          <Ionicons name="search-outline" size={25} color="#FFFFFF" />
          <View style={styles.cross}>
            <Ionicons name="close" size={10} color="#070235" />
          </View>
        </View>
      </View>

      <Text accessibilityRole="header" style={styles.title}>
        No encontramos vacantes con estos filtros
      </Text>
      <Text style={styles.description}>
        Intenta cambiar los términos de búsqueda, ajustar el rango salarial o
        explorar otras ciudades disponibles en OCC / Redarbor.
      </Text>

      <Pressable
        onPress={onClear}
        accessibilityRole="button"
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <Ionicons name="refresh-outline" size={21} color="#FFFFFF" />
        <Text style={styles.buttonText}>Limpiar todos los filtros</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEDF2',
    borderRadius: 20,
    alignItems: 'center',
    gap: 18,
  },
  illustration: { width: 112, height: 112, marginBottom: 4 },
  iconFrame: {
    flex: 1,
    borderRadius: 30,
    borderWidth: 10,
    borderColor: '#DCE9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    backgroundColor: '#070235',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cross: {
    position: 'absolute',
    left: 7,
    bottom: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
  },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 23,
    lineHeight: 31,
    color: '#070235',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    lineHeight: 25,
    color: '#47464F',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#070235',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 48,
    marginTop: 6,
  },
  pressed: { opacity: 0.75 },
  buttonText: {
    flexShrink: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
  },
});
