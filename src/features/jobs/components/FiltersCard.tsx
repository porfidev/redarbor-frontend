import { StyleSheet, View, ViewProps } from 'react-native';

type FiltersCardProps = ViewProps & {};
function FiltersCard({ children }: FiltersCardProps) {
  return <View style={styles.filtersCard}>{children}</View>;
}

const styles = StyleSheet.create({
  filtersCard: {
    borderWidth: 1,
    borderColor: 'rgba(200, 197, 208, 0.4)',
    backgroundColor: '#FFFFFF',
    minHeight: 200,
    borderRadius: 12,
    padding: 12,
  },
});
export { FiltersCard };
