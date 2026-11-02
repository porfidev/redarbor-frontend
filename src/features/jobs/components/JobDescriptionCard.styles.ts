import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

export const style1 = StyleSheet.create({ value: { marginTop: 3 } }).value;

export const style2 = StyleSheet.create({ value: { flex: 1 } }).value;
