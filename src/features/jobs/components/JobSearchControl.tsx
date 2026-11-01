import { Button, Text, TextInput, View } from 'react-native';

import type { JobSort } from '../jobs.schema';

type SearchForm = {
  q: string;
  city: string;
  salaryMin: string;
  salaryMax: string;
  sort: JobSort;
};

type JobSearchControlsProps = {
  value: SearchForm;
  onChange: (value: SearchForm) => void;
};

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type InlineSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly SelectOption<T>[];
  onChange: (value: T) => void;
};

const initialSearchForm: SearchForm = {
  q: '',
  city: '',
  salaryMin: '',
  salaryMax: '',
  sort: 'date_desc',
};

const cityOptions: readonly SelectOption<string>[] = [
  { label: 'Todas las ciudades', value: '' },
  { label: 'Ciudad de México', value: 'Ciudad de México' },
  { label: 'Guadalajara', value: 'Guadalajara' },
  { label: 'Monterrey', value: 'Monterrey' },
  { label: 'Puebla', value: 'Puebla' },
  { label: 'Querétaro', value: 'Querétaro' },
];

const sortOptions: readonly SelectOption<JobSort>[] = [
  { label: 'Más recientes', value: 'date_desc' },
  { label: 'Más antiguos', value: 'date_asc' },
  { label: 'Mayor salario', value: 'salary_desc' },
  { label: 'Menor salario', value: 'salary_asc' },
  { label: 'Relevancia', value: 'relevance' },
];

function InlineSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: InlineSelectProps<T>) {
  return (
    <View>
      <Text>{label}</Text>

      {options.map((option) => (
        <Button
          key={option.value}
          title={
            option.value === value
              ? `Seleccionado: ${option.label}`
              : option.label
          }
          disabled={option.value === value}
          onPress={() => onChange(option.value)}
        />
      ))}
    </View>
  );
}

function JobSearchControls({ value, onChange }: JobSearchControlsProps) {
  return (
    <View>
      <Text accessibilityRole="header">Buscar vacantes</Text>

      <Text>Búsqueda</Text>
      <TextInput
        accessibilityLabel="Buscar por título o empresa"
        placeholder="Título o empresa"
        value={value.q}
        onChangeText={(q) => onChange({ ...value, q })}
        autoCorrect={false}
        returnKeyType="search"
      />

      <InlineSelect
        label="Ciudad"
        value={value.city}
        options={cityOptions}
        onChange={(city) => onChange({ ...value, city })}
      />

      <Text>Salario mínimo</Text>
      <TextInput
        accessibilityLabel="Salario mínimo"
        placeholder="Sin mínimo"
        keyboardType="decimal-pad"
        value={value.salaryMin}
        onChangeText={(salaryMin) => onChange({ ...value, salaryMin })}
      />

      <Text>Salario máximo</Text>
      <TextInput
        accessibilityLabel="Salario máximo"
        placeholder="Sin máximo"
        keyboardType="decimal-pad"
        value={value.salaryMax}
        onChangeText={(salaryMax) => onChange({ ...value, salaryMax })}
      />

      <InlineSelect
        label="Ordenar por"
        value={value.sort}
        options={sortOptions}
        onChange={(sort) => onChange({ ...value, sort })}
      />

      <Button
        title="Limpiar filtros"
        onPress={() => onChange({ ...initialSearchForm })}
      />
    </View>
  );
}

export { JobSearchControls, initialSearchForm };
export type { SearchForm };
