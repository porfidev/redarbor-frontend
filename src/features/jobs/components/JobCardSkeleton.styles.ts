import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEDF2',
    padding: 16,
    gap: 14,
    marginBottom: 12,
  },
  placeholder: { backgroundColor: '#E8ECF4', borderRadius: 5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 12 },
  heading: { flex: 1, gap: 8 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: '#EFF3FF',
    paddingTop: 10,
  },
});

export const style1 = StyleSheet.create({
  value: { height: 20, width: '85%' },
}).value;

export const style2 = StyleSheet.create({
  value: { height: 14, width: '55%' },
}).value;

export const style3 = StyleSheet.create({ value: { height: 14 } }).value;

export const style4 = StyleSheet.create({
  value: { height: 14, width: '80%' },
}).value;

export const style5 = StyleSheet.create({
  value: { height: 20, flex: 1 },
}).value;

export const style6 = StyleSheet.create({
  value: { height: 30, flex: 1 },
}).value;

export const style7 = StyleSheet.create({
  value: { width: 65, height: 28 },
}).value;

export const style8 = StyleSheet.create({
  value: { width: 85, height: 28 },
}).value;

export const style9 = StyleSheet.create({
  value: { width: 60, height: 14, marginLeft: 'auto' },
}).value;
