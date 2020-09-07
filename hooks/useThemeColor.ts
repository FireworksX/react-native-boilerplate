import { Text, View } from 'react-native'

import useColorScheme from 'hooks/useColorScheme'
import Colors from 'themes/Colors'

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
    const theme = useColorScheme()
    const colorFromProps = props ? props[theme] : false

    if (colorFromProps) {
        return colorFromProps
    }

    return Colors[theme][colorName]
}
