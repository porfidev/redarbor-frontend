import type { SearchForm } from '@/features/jobs/components/JobSearchControl';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

type SearchInputProps = {
  value: SearchForm;
  onChange: (value: SearchForm) => void;
};
function SearchInput({ value, onChange }: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.searchInput, isFocused && styles.focused]}>
      <FontAwesome6
        name="magnifying-glass"
        size={15}
        color={isFocused ? '#0058BE' : '#47464F'}
      />
      <TextInput
        style={styles.input}
        accessibilityLabel="Buscar por título o empresa"
        placeholder="Buscar título o empresa"
        placeholderTextColor={'#47464F'}
        value={value.q}
        onChangeText={(q) => onChange({ ...value, q })}
        autoCorrect={false}
        returnKeyType="search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {value.q.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Borrar búsqueda"
          onPress={() => onChange({ ...value, q: '' })}
          style={styles.clearButton}
        >
          <FontAwesome6 name="xmark" size={12} color="#47464F" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 1,
  },
  focused: {
    borderColor: 'rgba(200, 197, 208, 0.4)',
  },
  input: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_400Regular',
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: '#E5EEFF',
    minWidth: 28,
    minHeight: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },
});

export { SearchInput };
