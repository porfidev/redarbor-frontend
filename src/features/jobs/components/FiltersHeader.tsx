import { styles } from './FiltersHeader.styles';
import * as componentStyles from './FiltersHeader.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

type FiltersHeaderProps = {
  title?: string;
  icon?: ReactNode;
  fontSize?: number;
  onClear?: () => void;
};

function FiltersHeader({
  title = 'Filtros en tiempo real',
  icon = <MaterialCommunityIcons name="tune" size={14} color="#0058BE" />,
  fontSize = 12,
  onClear,
}: FiltersHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleGroup}>
        {icon}
        <Text style={[styles.title, componentStyles.style1(fontSize)]}>
          {title}
        </Text>
      </View>

      {onClear && (
        <Pressable
          onPress={onClear}
          accessibilityRole="button"
          accessibilityLabel="Limpiar filtros"
          style={({ pressed }) => [
            styles.clearButton,
            componentStyles.style2(pressed),
          ]}
        >
          <MaterialCommunityIcons name="restore" size={12} color="#0058BE" />
          <Text style={styles.clearText}>Limpiar filtros</Text>
        </Pressable>
      )}
    </View>
  );
}

export { FiltersHeader };
