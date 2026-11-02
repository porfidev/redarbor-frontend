import { StyleSheet } from 'react-native';

export const style1 = StyleSheet.create({
  value: { flexDirection: 'row', gap: 12 },
}).value;

export function style2(busy: boolean, pressed: boolean) {
  return StyleSheet.create({
    value: {
      width: 54,
      minHeight: 54,
      borderRadius: 14,
      backgroundColor: '#EFF4FF',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: busy || pressed ? 0.5 : 1,
    },
  }).value;
}

export function style3(busy: boolean, applied: boolean, pressed: boolean) {
  return StyleSheet.create({
    value: {
      flex: 1,
      minHeight: 54,
      borderRadius: 14,
      backgroundColor: '#211B4B',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: busy || applied || pressed ? 0.5 : 1,
    },
  }).value;
}

export const style4 = StyleSheet.create({
  value: {
    color: 'white',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
}).value;
