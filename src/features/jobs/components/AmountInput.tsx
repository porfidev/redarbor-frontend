import { StyleSheet, Text, TextInput, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF3FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 36,
    flex: 1,
  },
  symbolContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  symbol: {
    color: '#47464F',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_500Medium',
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    color: '#47464F',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});

export { AmountInput };
