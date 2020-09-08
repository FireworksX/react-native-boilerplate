import { Text, View } from 'react-native'

import Colors from 'themes/Colors'
import useTheme from 'hooks/useTheme'

export type ThemeProps = {
    light?: string
    dark?: string
}

export type TextProps = Text['props']
export type ViewProps = View['props']

export type ColorName = keyof typeof Colors.light & keyof typeof Colors.dark

export default function useThemeColor(
    colorName: ColorName,
    props?: ThemeProps
) {
    const { theme } = useTheme()
    const colorFromProps = props ? props[theme] : false

    if (colorFromProps) {
        return colorFromProps
    }

    return Colors[theme][colorName]
}
