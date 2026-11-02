import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

const responsibilities = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo vel neque facilisis interdum.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
];

export function JobDescriptionCard() {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Ionicons name="document-text-outline" size={24} color="#0058BE" />
        <Text style={styles.title}>Descripción del Puesto</Text>
      </View>
      <Text style={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <Text style={styles.subtitle}>Responsabilidades Principales:</Text>
      {responsibilities.map((text) => (
        <View key={text} style={styles.row}>
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color="#0058BE"
            style={{ marginTop: 3 }}
          />
          <Text style={[styles.body, { flex: 1 }]}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EFF0F5',
    padding: 20,
    gap: 16,
  },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: {
    flex: 1,
    color: '#070235',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 20,
  },
  body: {
    color: '#0B1C30',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    lineHeight: 24,
  },
  subtitle: {
    color: '#070235',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 16,
    marginTop: 6,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
});
