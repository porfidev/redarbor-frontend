import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

function SalaryNotice() {
  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={12} color="#0058BE" />

      <Text style={styles.text}>
        Vacantes sin salario se ocultan automáticamente al filtrar por rango
        salarial.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F5FF',
  },
  text: {
    flex: 1,
    color: '#47464F',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 11,
    includeFontPadding: false,
  },
});

export { SalaryNotice };
