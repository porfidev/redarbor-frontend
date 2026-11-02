import { styles } from './OccHeader.styles';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function OccHeader() {
  return (
    <SafeAreaView>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Occ Jobs</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
    </SafeAreaView>
  );
}

export { OccHeader };
