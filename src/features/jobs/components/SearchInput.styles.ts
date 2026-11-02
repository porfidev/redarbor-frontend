import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 1,
  },
  focused: {
    borderColor: 'rgba(200, 197, 208, 0.4)',
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: '#E5EEFF',
    minWidth: 28,
    minHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
});
