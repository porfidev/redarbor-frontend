import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
