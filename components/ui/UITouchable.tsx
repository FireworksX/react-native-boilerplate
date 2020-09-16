import React, { FunctionComponent } from 'react'
import {
    GestureResponderEvent,
    TouchableOpacity,
    ViewStyle,
} from 'react-native'
import { CallbackValue } from '../../types/types'

export interface UITouchableProps {
    style?: ViewStyle | ViewStyle[]
    onPress?: CallbackValue<GestureResponderEvent, void>
}

const UITouchable: FunctionComponent<UITouchableProps> = ({
    children,
    style,
    onPress,
}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}

export default UITouchable
