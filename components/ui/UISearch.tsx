import React, { FunctionComponent } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'components/Icon'
import ThemeView from 'components/ThemeView'
import { useThemeColor } from 'components/Themed'

export interface BaseSearchProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        paddingLeft: 15,
        paddingRight: 35,
        paddingVertical: 10,
        width: '90%',
    },
    aside: {
        padding: 10,
    },
})

const UISearch: FunctionComponent<BaseSearchProps> = ({
    value,
    onChange,
    placeholder,
}) => {
    const getAsideFragment = () => {
        if (value && value.length > 0) {
            return (
                <TouchableOpacity
                    style={styles.aside}
                    onPress={() => onChange('')}
                >
                    <Icon name="times-circle" size={15} />
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.aside}>
                    <Icon name="search" size={15} color="#DADADA" />
                </View>
            )
        }
    }

    const textColor = useThemeColor({}, 'typographyLight')

    return (
        <ThemeView
            mode="inputView"
            borderMode="inputBorder"
            style={styles.container}
        >
            <TextInput
                style={[
                    styles.input,
                    {
                        color: textColor,
                    },
                ]}
                value={value}
                placeholder={placeholder}
                onChangeText={onChange}
            />
            {getAsideFragment()}
        </ThemeView>
    )
}

UISearch.defaultProps = {
    placeholder: 'Поиск',
}

export default UISearch
