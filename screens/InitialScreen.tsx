import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import UILayout from 'components/ui/UILayout'
import UIView from 'components/ui/UIView'
import useStore from 'hooks/useStore'
import UIText from 'components/ui/UIText'
import UIButton from 'components/ui/UIButton'

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    name: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40,
    },
})

const InitialScreen = ({ navigation }) => {
    const {
        UserStore: { checkToken, authUser, logOut, fullName, token, isLoading },
    } = useStore()

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <UILayout>
            <UIView style={styles.container}>
                <UIButton onPress={() => navigation.navigate('AuthScreen')}>
                    Login
                </UIButton>
                <UIText mode="textMain">{fullName}</UIText>
                {token ? (
                    <TouchableOpacity onPress={logOut}>
                        <UIText>logout</UIText>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => authUser('admin', 'admin')}
                    >
                        <UIText>login</UIText>
                    </TouchableOpacity>
                )}
            </UIView>
        </UILayout>
    )
}

export default observer(InitialScreen)
