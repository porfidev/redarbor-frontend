import { styles } from './JobsErrorState.styles';
import * as componentStyles from './JobsErrorState.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

type JobsErrorStateProps = {
  onRetry: () => void;
};

export function JobsErrorState({ onRetry }: JobsErrorStateProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconHalo}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="wifi-off" size={48} color="#C51C1C" />
        </View>
      </View>
      <Text style={styles.status}>● CONEXIÓN INTERRUMPIDA</Text>
      <Text accessibilityRole="alert" style={styles.title}>
        Error al cargar las vacantes
      </Text>
      <Text style={styles.description}>
        No pudimos cargar las vacantes desde el servidor. Verifica tu conexión a
        internet o intenta nuevamente.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onRetry}
        style={({ pressed }) => [
          styles.button,
          pressed && componentStyles.style1,
        ]}
      >
        <MaterialCommunityIcons name="reload" size={22} color="#FFFFFF" />
        <Text style={styles.buttonText}>Reintentar búsqueda</Text>
      </Pressable>
    </View>
  );
}
