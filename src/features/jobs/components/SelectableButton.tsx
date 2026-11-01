import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

type SelectableButtonProps = PressableProps & {
  placeholder: string;
  value?: string;
};

function SelectableButton({
  onPress,
  placeholder,
  value,
}: SelectableButtonProps) {
  return (
    <Pressable
      style={styles.selectableButton}
      onPress={onPress}
      accessibilityRole="button"
    >
      {({ pressed }) => (
        <>
          <Text style={[styles.valueText, pressed && styles.valueTextPressed]}>
            {value || placeholder}
          </Text>
          <FontAwesome name="angle-down" size={18} color="#0B1C30" />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  selectableButton: {
    backgroundColor: '#EFF4FF',
    flexDirection: 'row',
    borderRadius: 12,
    height: 36,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  valueText: {
    color: '#0B1C30',
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
  },
  valueTextPressed: {
    color: '#0B1C30',
  },
});

export { SelectableButton };
