import { styles } from './FieldLabel.styles';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

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

export { FieldLabel };
