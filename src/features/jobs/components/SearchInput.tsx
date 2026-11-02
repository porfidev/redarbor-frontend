import { styles } from './SearchInput.styles';
import type { SearchForm } from '@/features/jobs/types/SearchForm';
import { FontAwesome6 } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

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

export { SearchInput };
