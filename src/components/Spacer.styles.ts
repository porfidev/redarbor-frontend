import { StyleSheet } from 'react-native';

export function style1(height: number) {
  return StyleSheet.create({ value: { height } }).value;
}
