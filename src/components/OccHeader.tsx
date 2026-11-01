import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#F8F9FF',
    height: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});
export { OccHeader };
