import { styles } from './ThemedText.styles';
import * as componentStyles from './ThemedText.styles';
import { Text, type TextProps } from 'react-native';

import type { ThemeColor } from '@/constants/theme';

import { useTheme } from '@/hooks/useTheme';

export type ThemedTextProps = TextProps & {
  type?:
    | 'default'
    | 'title'
    | 'small'
    | 'smallBold'
    | 'subtitle'
    | 'link'
    | 'linkPrimary'
    | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = 'default',
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[componentStyles.style1(theme, themeColor), styles[type], style]}
      {...rest}
    />
  );
}
