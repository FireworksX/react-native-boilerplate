import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export type ThemeProps = {
  light?: string;
  dark?: string;
};
//
export type TextProps = DefaultText['props'];
// export type ViewProps = ThemeProps & DefaultView['props'];
//
// export function Text(props: TextProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
//
//   return <DefaultText style={[{ color }, style]} {...otherProps} />;
// }
//
// export function View(props: ViewProps) {
//   const { style, lightColor, darkColor, ...otherProps } = props;
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
//
//   return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
// }