import { StyleSheet, View } from 'react-native';

export function JobCardSkeleton() {
  return (
    <View
      style={styles.card}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.row}>
        <View style={[styles.placeholder, styles.avatar]} />
        <View style={styles.heading}>
          <View style={[styles.placeholder, { height: 20, width: '85%' }]} />
          <View style={[styles.placeholder, { height: 14, width: '55%' }]} />
        </View>
      </View>
      <View style={[styles.placeholder, { height: 14 }]} />
      <View style={[styles.placeholder, { height: 14, width: '80%' }]} />
      <View style={styles.row}>
        <View style={[styles.placeholder, { height: 20, flex: 1 }]} />
        <View style={[styles.placeholder, { height: 30, flex: 1 }]} />
      </View>
      <View style={styles.footer}>
        <View style={[styles.placeholder, { width: 65, height: 28 }]} />
        <View style={[styles.placeholder, { width: 85, height: 28 }]} />
        <View
          style={[
            styles.placeholder,
            { width: 60, height: 14, marginLeft: 'auto' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
