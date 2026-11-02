import * as componentStyles from './JobSearchControls.styles';
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
  Octicons,
} from '@expo/vector-icons';
import {
  BottomSheetModal,
  useBottomSheetScrollableCreator,
} from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { JobSort } from '../jobs.schema';
import type { SearchForm } from '../types/SearchForm';

type JobSearchControlsProps = {
  sortDisabled?: boolean;
  onClear: () => void;
  value: SearchForm;
  onChange: (value: SearchForm) => void;
};

type SelectOption<T extends string> = {
  label: string;
  value: T;
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

const sortIcons: Record<JobSort, ReactNode> = {
  date_desc: (
    <MaterialCommunityIcons
      name="sort-calendar-descending"
      size={13}
      color="#0058BE"
    />
  ),
  date_asc: (
    <MaterialCommunityIcons
      name="sort-calendar-ascending"
      size={13}
      color="#0058BE"
    />
  ),
  salary_desc: (
    <MaterialCommunityIcons
      name="sort-numeric-descending"
      size={13}
      color="#0058BE"
    />
  ),
  salary_asc: (
    <MaterialCommunityIcons
      name="sort-numeric-ascending"
      size={13}
      color="#0058BE"
    />
  ),
  relevance: <FontAwesome6 name="star" size={13} color="#0058BE" />,
};

const sortOptions: readonly SelectOption<JobSort>[] = [
  { label: 'Más recientes', value: 'date_desc' },
  { label: 'Más antiguos', value: 'date_asc' },
  { label: 'Mayor salario', value: 'salary_desc' },
  { label: 'Menor salario', value: 'salary_asc' },
  { label: 'Relevancia', value: 'relevance' },
];

function JobSearchControls({
  value,
  onChange,
  onClear,
  sortDisabled = false,
}: JobSearchControlsProps) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const sortSheetRef = useRef<BottomSheetModal>(null);
  const SortScrollComponent = useBottomSheetScrollableCreator();
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
          <View style={componentStyles.style1}>
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

      <Spacer />
      <FiltersCard>
        <>
          <FiltersHeader
            title="Ordenar por"
            icon={
              <MaterialCommunityIcons name="sort" size={14} color="#0058BE" />
            }
          />
          <Spacer />
          <SelectableButton
            placeholder="Selecciona el orden"
            disabled={sortDisabled}
            value={
              sortOptions.find((option) => option.value === value.sort)
                ?.label ?? ''
            }
            onPress={() => sortSheetRef.current?.present()}
          />
        </>
      </FiltersCard>

      <BottomSheetModal
        ref={sortSheetRef}
        snapPoints={['40%']}
        enableDynamicSizing={false}
        enablePanDownToClose
      >
        <FlashList
          style={componentStyles.style2(insets)}
          data={sortOptions}
          extraData={value.sort}
          keyExtractor={(item) => item.value}
          renderScrollComponent={SortScrollComponent}
          contentContainerStyle={componentStyles.style3}
          ListHeaderComponent={
            <View style={componentStyles.style4}>
              <FieldLabel label="ORDENAR POR" />
            </View>
          }
          ItemSeparatorComponent={() => <Spacer height={6} />}
          renderItem={({ item }) => (
            <SelectableOption
              accessibilityRole="radio"
              accessibilityState={{ checked: item.value === value.sort }}
              label={item.label}
              selected={item.value === value.sort}
              icon={sortIcons[item.value]}
              onPress={() => {
                onChange({ ...value, sort: item.value });
                sortSheetRef.current?.dismiss();
              }}
            />
          )}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['40%']}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
      >
        <FlashList
          style={componentStyles.style5(insets)}
          data={cityOptions}
          contentContainerStyle={componentStyles.style6}
          renderScrollComponent={ScrollComponent}
          ListHeaderComponent={
            <View style={componentStyles.style7}>
              <MaterialCommunityIcons
                name="office-building-marker-outline"
                size={11}
                color="#0058BE"
              />
              <Text style={componentStyles.style8}>
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
