import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import BaseInput from 'components/BaseInput'
import { CallbackMaybe } from 'types/types'
import Icon from './Icon'

export interface SelectMimicryProps {
    value?: string
    label?: string
    onPress?: CallbackMaybe<any, any>
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        right: 20,
        top: 25,
    },
})

const UISelectMimicry: FunctionComponent<SelectMimicryProps> = ({
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
            <Icon
                style={styles.icon}
                size={15}
                name="chevron-right"
                pointerEvents="none"
            />
        </View>
    )
}

export default UISelectMimicry
