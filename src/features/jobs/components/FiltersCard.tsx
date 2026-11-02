import { styles } from './FiltersCard.styles';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

type FiltersCardProps = ViewProps & {};
function FiltersCard({ children }: FiltersCardProps) {
  return <View style={styles.filtersCard}>{children}</View>;
}

export { FiltersCard };
