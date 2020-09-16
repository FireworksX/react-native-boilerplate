import React, {
    FunctionComponent,
    ReactNode,
    useCallback,
    useMemo,
} from 'react'
import UITouchable from 'components/ui/UITouchable'
import UIText from 'components/ui/UIText'
import UIView from 'components/ui/UIView'
import { GestureResponderEvent, StyleSheet, View } from 'react-native'
import { ColorName } from '../../hooks/useThemeColor'
import { CallbackValue } from '../../types/types'

export type UIButtonSize = 'm' | 'l' | 'xl'
export type UIButtonMode = 'primary' | 'secondary' | 'tertiary'

export interface UIButtonProps {
    before?: ReactNode
    disabled?: boolean
    children?: string
    stretched?: boolean
    size?: UIButtonSize
    mode?: UIButtonMode
    onPress?: CallbackValue<GestureResponderEvent, void>
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    before: {
        marginRight: 8,
    },
    'view-m': {
        paddingVertical: 7,
        paddingHorizontal: 16,
    },
    'text-m': {
        fontSize: 14,
    },
    'wrapper-m': {},
    'view-l': {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    'text-l': {
        fontSize: 15,
    },
    'wrapper-l': {},
    'view-xl': {
        paddingVertical: 11,
        paddingHorizontal: 16,
        width: '100%',
    },
    'wrapper-xl': {
        width: '100%',
    },
    'text-xl': {
        fontSize: 17,
    },
})

const UIButton: FunctionComponent<UIButtonProps> = ({
    children,
    size,
    mode,
    stretched,
    before,
    disabled,
    onPress,
}) => {
    const getSizes = useCallback(() => {
        switch (size) {
            case 'm':
                return {
                    view: styles['view-m'],
                    text: styles['text-m'],
                    wrapper: styles['wrapper-m'],
                }
            case 'l':
                return {
                    view: styles['view-l'],
                    text: styles['text-l'],
                    wrapper: styles['wrapper-l'],
                }
            case 'xl':
                return {
                    view: styles['view-xl'],
                    text: styles['text-xl'],
                    wrapper: styles['wrapper-xl'],
                }
            default:
                return {
                    view: styles['view-m'],
                    text: styles['text-m'],
                    wrapper: {},
                }
        }
    }, [size])

    const [viewSize, textSize, wrapperSize] = useMemo(() => {
        return [getSizes().view, getSizes().text, getSizes().wrapper]
    }, [size])

    const [viewTheme, textTheme] = useMemo<[ColorName, ColorName]>(() => {
        switch (mode) {
            case 'primary':
                return ['buttonPrimaryBackground', 'buttonPrimaryForeground']
            case 'secondary':
                return [
                    'buttonSecondaryBackground',
                    'buttonSecondaryForeground',
                ]
            default:
                return ['buttonPrimaryBackground', 'buttonPrimaryForeground']
        }
    }, [mode])

    const calcWidth = stretched ? '100%' : 'auto'

    const Component = disabled ? View : UITouchable

    return (
        <Component
            style={[
                styles.wrapper,
                { width: calcWidth, opacity: disabled ? 0.8 : 1 },
                wrapperSize,
            ]}
            onPress={onPress}
        >
            <UIView
                style={[
                    styles.button,
                    {
                        width: calcWidth,
                    },
                    viewSize,
                ]}
                mode={viewTheme}
            >
                {before && (
                    <UIView style={styles.before} mode={textTheme}>
                        {before}
                    </UIView>
                )}

                <UIText style={[textSize]} mode={textTheme}>
                    {children}
                </UIText>
            </UIView>
        </Component>
    )
}

UIButton.defaultProps = {
    size: 'm',
}

export default UIButton
