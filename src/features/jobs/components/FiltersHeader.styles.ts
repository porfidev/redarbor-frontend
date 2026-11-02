import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF3FF',
    paddingBottom: 8,
  },
  titleGroup: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    flexShrink: 1,
    color: '#070235',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    includeFontPadding: false,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 24,
  },
  clearText: {
    color: '#0058BE',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    includeFontPadding: false,
  },
});

export function style1(fontSize: number) {
  return StyleSheet.create({ value: { fontSize } }).value;
}

export function style2(pressed: boolean) {
  return StyleSheet.create({ value: { opacity: pressed ? 0.6 : 1 } }).value;
}
