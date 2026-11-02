import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    marginBottom: 16,
    padding: 24,
    gap: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0BBBB',
    backgroundColor: '#FFFAFA',
  },
  iconHalo: { padding: 10, borderRadius: 60, backgroundColor: '#FFF0F0' },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFDFDF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    color: '#C51C1C',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    textAlign: 'center',
  },
  title: {
    color: '#070235',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 23,
    lineHeight: 31,
    textAlign: 'center',
  },
  description: {
    color: '#47464F',
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    minHeight: 52,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#070235',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonText: {
    flexShrink: 1,
    color: '#FFFFFF',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export const style1 = StyleSheet.create({ value: { opacity: 0.75 } }).value;
