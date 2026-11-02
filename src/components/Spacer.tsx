import * as componentStyles from './Spacer.styles';
import { View } from 'react-native';

type SpacerProps = {
  height?: number;
};

function Spacer({ height = 12 }: SpacerProps) {
  return <View style={componentStyles.style1(height)} />;
}

export { Spacer };
