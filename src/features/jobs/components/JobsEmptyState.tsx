import { styles } from './JobsEmptyState.styles';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

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
