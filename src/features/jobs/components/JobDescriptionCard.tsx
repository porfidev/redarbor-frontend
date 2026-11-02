import { styles } from './JobDescriptionCard.styles';
import * as componentStyles from './JobDescriptionCard.styles';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

const responsibilities = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo vel neque facilisis interdum.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
];

export function JobDescriptionCard() {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Ionicons name="document-text-outline" size={24} color="#0058BE" />
        <Text style={styles.title}>Descripción del Puesto</Text>
      </View>
      <Text style={styles.body}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <Text style={styles.subtitle}>Responsabilidades Principales:</Text>
      {responsibilities.map((text) => (
        <View key={text} style={styles.row}>
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color="#0058BE"
            style={componentStyles.style1}
          />
          <Text style={[styles.body, componentStyles.style2]}>{text}</Text>
        </View>
      ))}
    </View>
  );
}
