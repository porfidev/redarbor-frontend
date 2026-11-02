import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF3FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    flex: 1,
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    color: '#47464F',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_500Medium',
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    color: '#47464F',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});
