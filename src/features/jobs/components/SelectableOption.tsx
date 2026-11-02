import { styles } from './SelectableOption.styles';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { Pressable, Text, View } from 'react-native';

type SelectableOptionProps = PressableProps & {
  selected?: boolean;
  label: string;
  icon?: ReactNode;
};

function SelectableOption({
  selected,
  label,
  icon = <FontAwesome6 name="building" size={13} color="black" />,
  ...props
}: SelectableOptionProps) {
  return (
    <Pressable
      style={[
        styles.selectableOption,
        selected && styles.selectableOptionSelected,
      ]}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      {...props}
    >
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.labelWrapper}>
        <Text style={[styles.labelText, selected && styles.labelTextSelected]}>
          {label}
        </Text>
      </View>
      <View style={[styles.circle, selected && styles.selected]}>
        {selected && <FontAwesome5 name="check" size={6} color="white" />}
      </View>
    </Pressable>
  );
}

export { SelectableOption };
