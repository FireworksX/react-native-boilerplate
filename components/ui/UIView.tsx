import React, { ReactNode, FunctionComponent } from 'react'
import { View, ViewProps } from 'react-native'
import useThemeColor, { ColorName, ThemeProps } from 'hooks/useThemeColor'

export interface ThemeViewProps extends ViewProps {
    children?: ReactNode | ReactNode[] | undefined
    mode?: ColorName
    borderMode?: ColorName
    theme?: ThemeProps
}

const UIView: FunctionComponent<ThemeViewProps> = ({
    children,
    mode,
    theme,
    borderMode,
    ...rest
}) => {
    const color = useThemeColor(mode ?? 'viewMain')
    const borderColor = useThemeColor(borderMode ?? 'textMain')
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

export default UIView
