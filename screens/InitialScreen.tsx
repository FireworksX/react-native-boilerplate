import React, { useEffect, useState } from 'react'
import withStores from '../hocs/withStores'
import { Stores } from '../types/types'
import BaseView from '../components/BaseView'
import { Text, StyleSheet, ActivityIndicator } from 'react-native'
import LocalStorage from '../utils/LocalStorage'
import ThemeText from '../components/ThemeText'
import { useThemeColor } from '../components/Themed'
import BaseSearch from 'components/BaseSearch'

const InitialScreen = ({ userStore, routerStore }: Stores) => {
    useEffect(() => {
        initApp()
    }, [])

    const initApp = async () => {
        const token = await LocalStorage.getItem('token')
        if (token) {
            const data = await userStore.fetchUser(token)
            if (data) {
                routerStore.replace('Root')
            } else {
                routerStore.replace('AuthLogin')
            }
        } else {
            routerStore.replace('AuthLogin')
        }
    }

    const [isOpen, setIsOpen] = useState(false)

    const textColor = useThemeColor({}, 'typographyLight')

    return (
        <BaseView style={styles.container}>
            <BaseSearch onChange={() => undefined} value={''} />
            <ThemeText mode="typographyLight" style={styles.name}>
                Museum
            </ThemeText>
            <ActivityIndicator size="small" color={textColor} />
        </BaseView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40,
    },
})

export default withStores(InitialScreen)
