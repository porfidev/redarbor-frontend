import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F7FAFF' },
  title: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 30,
    color: '#0B1C30',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 15,
    lineHeight: 23,
    color: '#47464F',
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#EFF3FF',
    borderRadius: 16,
    padding: 5,
    gap: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minHeight: 48,
    paddingHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeTab: { backgroundColor: '#211B4B' },
  tabText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 13,
    color: '#47464F',
  },
  activeText: { color: '#FFFFFF' },
  count: {
    backgroundColor: '#DCE9FF',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeCount: { backgroundColor: '#48436F' },
  countText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: '#47464F',
  },
  activity: { marginBottom: 16 },
});

export const style1 = StyleSheet.create({
  value: { padding: 16, paddingBottom: 32 },
}).value;

export const style2 = StyleSheet.create({ value: { marginTop: 16 } }).value;
