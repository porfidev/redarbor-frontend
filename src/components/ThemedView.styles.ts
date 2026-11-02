import { StyleSheet } from 'react-native';

export function style1(
  theme: Record<string, string>,
  type:
    | 'text'
    | 'background'
    | 'backgroundElement'
    | 'backgroundSelected'
    | 'textSecondary'
    | undefined,
) {
  return StyleSheet.create({
    value: { backgroundColor: theme[type ?? 'background'] },
  }).value;
}
