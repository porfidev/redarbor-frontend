import { View } from 'react-native';

type SpacerProps = {
  height?: number;
};

function Spacer({ height = 12 }: SpacerProps) {
  return <View style={{ height }} />;
}

export { Spacer };
