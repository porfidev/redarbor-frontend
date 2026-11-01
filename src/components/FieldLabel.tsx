import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type FieldLabelProps = {
  label: string;
  icon?: ReactNode;
};

function FieldLabel({ label, icon }: FieldLabelProps) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  label: {
    color: '#47464F',
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
  },
});

export { FieldLabel };
