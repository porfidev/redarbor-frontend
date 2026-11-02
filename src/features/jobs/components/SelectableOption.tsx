import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

const styles = StyleSheet.create({
  selectableOption: {
    height: 58,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(200, 197, 208, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 12,
  },
  selectableOptionSelected: {
    borderColor: '#0058BE',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    backgroundColor: '#E5EEFF',
    borderRadius: 8,
  },
  labelWrapper: {
    flex: 1,
  },
  labelText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    color: '#0B1C30',
  },
  labelTextSelected: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8C5D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#0058BE',
    boxShadow: '0px 0px 0px 2px rgba(0, 88, 190, 0.2)',
  },
  check: {
    width: 6,
    height: 6,
    borderRadius: 20,
    backgroundColor: '#0058BE',
    boxShadow: '0px 0px 0px 2px rgba(0, 88, 190, 0.2)',
  },
});

export { SelectableOption };
