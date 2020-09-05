import React, { ReactNode } from 'react'
import { Text, TextStyle, View, ViewProps } from 'react-native'
import { ColorName, ThemeProps, useThemeColor } from './Themed'
import { FunctionComponent } from 'react'

export interface ThemeView extends ViewProps {
    children?: ReactNode | ReactNode[] | undefined
    mode?: ColorName
    borderMode?: ColorName
    theme?: ThemeProps
}

const ThemeView: FunctionComponent<ThemeView> = ({
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
                rest.style
            ]}
        >
            {children}
        </View>
    )
}

export default ThemeView
