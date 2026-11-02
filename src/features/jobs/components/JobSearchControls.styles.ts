import type { EdgeInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export const style1 = StyleSheet.create({
  value: { flexDirection: 'row', gap: 12 },
}).value;

export function style2(insets: EdgeInsets) {
  return StyleSheet.create({ value: { marginBottom: insets.bottom } }).value;
}

export const style3 = StyleSheet.create({
  value: { paddingHorizontal: 16, paddingBottom: 16 },
}).value;

export const style4 = StyleSheet.create({
  value: { paddingVertical: 8 },
}).value;

export function style5(insets: EdgeInsets) {
  return StyleSheet.create({ value: { marginBottom: insets.bottom } }).value;
}

export const style6 = StyleSheet.create({
  value: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
}).value;

export const style7 = StyleSheet.create({
  value: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
}).value;

export const style8 = StyleSheet.create({
  value: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#47464F',
  },
}).value;
