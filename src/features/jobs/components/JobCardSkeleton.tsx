import { styles } from './JobCardSkeleton.styles';
import * as componentStyles from './JobCardSkeleton.styles';
import { View } from 'react-native';

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
          <View style={[styles.placeholder, componentStyles.style1]} />
          <View style={[styles.placeholder, componentStyles.style2]} />
        </View>
      </View>
      <View style={[styles.placeholder, componentStyles.style3]} />
      <View style={[styles.placeholder, componentStyles.style4]} />
      <View style={styles.row}>
        <View style={[styles.placeholder, componentStyles.style5]} />
        <View style={[styles.placeholder, componentStyles.style6]} />
      </View>
      <View style={styles.footer}>
        <View style={[styles.placeholder, componentStyles.style7]} />
        <View style={[styles.placeholder, componentStyles.style8]} />
        <View style={[styles.placeholder, componentStyles.style9]} />
      </View>
    </View>
  );
}
