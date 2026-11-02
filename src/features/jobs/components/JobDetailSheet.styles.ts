import type { EdgeInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export const style1 = StyleSheet.create({
  value: { alignItems: 'flex-end', paddingHorizontal: 20 },
}).value;

export function style2(pressed: boolean) {
  return StyleSheet.create({
    value: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#E5EEFF',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: pressed ? 0.6 : 1,
    },
  }).value;
}

export const style3 = StyleSheet.create({ value: { flex: 1 } }).value;

export const style4 = StyleSheet.create({
  value: { padding: 16, backgroundColor: '#F7F8FD' },
}).value;

export function style5(insets: EdgeInsets) {
  return StyleSheet.create({
    value: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: insets.bottom + 12,
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#EFF3FF',
    },
  }).value;
}
