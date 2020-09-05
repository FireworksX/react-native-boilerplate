import React, { ReactNode, FunctionComponent } from 'react'
import { Text, TextStyle } from 'react-native'
import { ColorName, TextProps, ThemeProps, useThemeColor } from 'components/Themed'

export interface ThemeTextProps extends TextProps {
    children?: string | ReactNode
    mode?: ColorName
    theme?: ThemeProps
}

const ThemeText: FunctionComponent<ThemeTextProps> = ({
    children,
    mode,
    theme,
    ...rest
}) => {
    const color = useThemeColor(theme ?? {}, mode ?? 'typographyDark')
    return (
        <Text
            {...rest}
            style={[
                {
                    color,
                },
                rest.style,
            ]}
        >
            {children}
        </Text>
    )
}

export default ThemeText
