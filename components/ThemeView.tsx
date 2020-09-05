import React, { ReactNode, FunctionComponent } from 'react'
import { Text, TextStyle, View, ViewProps } from 'react-native'
import { ColorName, ThemeProps, useThemeColor } from './Themed'

export interface ThemeViewProps extends ViewProps {
    children?: ReactNode | ReactNode[] | undefined
    mode?: ColorName
    borderMode?: ColorName
    theme?: ThemeProps
}

const ThemeView: FunctionComponent<ThemeViewProps> = ({
    children,
    mode,
    theme,
    borderMode,
    ...rest
}) => {
    const color = useThemeColor(theme ?? {}, mode ?? 'backgroundLight')
    const borderColor = useThemeColor(
        theme ?? {},
        borderMode ?? 'backgroundLight'
    )
    return (
        <View
            {...rest}
            style={[
                {
                    backgroundColor: color,
                    borderColor,
                },
                rest.style,
            ]}
        >
            {children}
        </View>
    )
}

export default ThemeView
