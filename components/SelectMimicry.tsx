import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import BaseInput from './BaseInput'
import { Callback } from '../types/types'
import Icon from './Icon'

export interface SelectMimicryProps {
    value?: string
    label?: string
    onPress?: Callback<any, any>
}

const SelectMimicry: FunctionComponent<SelectMimicryProps> = ({
    label,
    value,
    onPress,
}) => {
    return (
        <View>
            <BaseInput
                label={label}
                value={value}
                onInput={() => undefined}
                onPress={onPress}
            />
            <Icon style={styles.icon} size={15} name="chevron-right" pointerEvents="none" />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 20,
        top: 25
    },
})

export default SelectMimicry
