import { styles } from './SelectableButton.styles';
import * as componentStyles from './SelectableButton.styles';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';

type SelectableButtonProps = PressableProps & {
  placeholder: string;
  value?: string;
};

function SelectableButton({
  onPress,
  placeholder,
  value,
  disabled = false,
}: SelectableButtonProps) {
  return (
    <Pressable
      style={[styles.selectableButton, disabled && componentStyles.style1]}
      disabled={disabled}
      accessibilityState={{ disabled }}
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

export { SelectableButton };
