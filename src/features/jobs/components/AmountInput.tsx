import { styles } from './AmountInput.styles';
import { Text, TextInput, View } from 'react-native';

type AmountInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

function AmountInput({
  value,
  onChangeText,
  placeholder = 'Mínimo (USD)',
}: AmountInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbol}>$</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        keyboardType="decimal-pad"
        accessibilityLabel={placeholder}
        style={styles.input}
      />
    </View>
  );
}

export { AmountInput };
