import React, { ReactNode, FunctionComponent } from 'react'
import { Text, TextStyle } from 'react-native'
import useThemeColor, {
    ColorName,
    TextProps,
    ThemeProps,
} from 'hooks/useThemeColor'

export interface ThemeTextProps extends TextProps {
    children?: string | ReactNode
    mode?: ColorName
    theme?: ThemeProps
}

const UIText: FunctionComponent<ThemeTextProps> = ({
    children,
    mode,
    theme,
    ...rest
}) => {
    const color = useThemeColor('main')
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

export default UIText
