import { styles } from './SalaryNotice.styles';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

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

export { SalaryNotice };
