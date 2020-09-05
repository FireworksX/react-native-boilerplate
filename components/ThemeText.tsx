import React, {ReactNode} from "react";
import { Text, TextStyle } from 'react-native'
import {ColorName, TextProps, ThemeProps, useThemeColor} from './Themed'
import { FunctionComponent } from 'react'

export interface ThemeText extends TextProps{
    children?: string | ReactNode
    mode?: ColorName
    theme?: ThemeProps
}

const ThemeText: FunctionComponent<ThemeText> = ({
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
                rest.style
            ]}
        >
            {children}
        </Text>
    )
}

export default ThemeText
