import { FieldLabel } from '@/components/FieldLabel';
import { Spacer } from '@/components/Spacer';
import { AmountInput } from '@/features/jobs/components/AmountInput';
import { FiltersCard } from '@/features/jobs/components/FiltersCard';
import { FiltersHeader } from '@/features/jobs/components/FiltersHeader';
import { SalaryNotice } from '@/features/jobs/components/SalaryNotice';
import { SearchInput } from '@/features/jobs/components/SearchInput';
import { SelectableButton } from '@/features/jobs/components/SelectableButton';
import { SelectableOption } from '@/features/jobs/components/SelectableOption';
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import {
  BottomSheetFlashList,
  BottomSheetModal,
  useBottomSheetScrollableCreator,
} from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useRef } from 'react';
import { Button, Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { JobSort } from '../jobs.schema';
import { SearchForm } from '../types/SearchForm';

type JobSearchControlsProps = {
  onClear: () => void;
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

function JobSearchControls({ value, onChange, onClear }: JobSearchControlsProps) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const ScrollComponent = useBottomSheetScrollableCreator();
  const insets = useSafeAreaInsets();

  return (
    <View>
      <SearchInput value={value} onChange={onChange} />
      <Spacer />
      <FiltersCard>
        <>
          <FiltersHeader onClear={onClear} />
          <Spacer />
          <FieldLabel
            label={'Ciudad'}
            icon={<Octicons name="location" size={12} color="#0058BE" />}
          />
          <SelectableButton
            placeholder={'Selecciona una ciudad'}
            value={value.city}
            onPress={() => sheetRef.current?.present()}
          />
          <Spacer />
          <FieldLabel
            label={'Rango Salarial Mensual'}
            icon={<FontAwesome6 name="money-bills" size={12} color="#009D6C" />}
          />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <AmountInput
              placeholder="Mínimo (MXN)"
              value={value.salaryMin}
              onChangeText={(salaryMin) => onChange({ ...value, salaryMin })}
            />
            <AmountInput
              placeholder="Máximo (MXN)"
              value={value.salaryMax}
              onChangeText={(salaryMax) => onChange({ ...value, salaryMax })}
            />
          </View>
          <Spacer />
          <SalaryNotice />
        </>
      </FiltersCard>

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

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['40%']}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
      >
        <FlashList
          style={{ marginBottom: insets.bottom }}
          data={cityOptions}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
          renderScrollComponent={ScrollComponent}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingVertical: 8,
              }}
            >
              <MaterialCommunityIcons
                name="office-building-marker-outline"
                size={11}
                color="#0058BE"
              />
              <Text
                style={{
                  fontSize: 11,
                  fontFamily: 'PlusJakartaSans_700Bold',
                  color: '#47464F',
                }}
              >
                PRINCIPALES CIUDADES (MÉXICO)
              </Text>
            </View>
          }
          ItemSeparatorComponent={() => <Spacer height={6} />}
          renderItem={({ item }) => {
            const selected = item.value === value.city;

            return (
              <SelectableOption
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                onPress={() => {
                  onChange({ ...value, city: item.value });
                  sheetRef.current?.dismiss();
                }}
                label={item.label}
                selected={selected}
              />
            );
          }}
        />
      </BottomSheetModal>
    </View>
  );
}

export { JobSearchControls, initialSearchForm };
export type { SearchForm };
