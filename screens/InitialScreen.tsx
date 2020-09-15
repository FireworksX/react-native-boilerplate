import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import UILayout from 'components/ui/UILayout'
import UIView from 'components/ui/UIView'
import useStore from '../hooks/useStore'
import UIText from 'components/ui/UIText'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40,
    },
})

const InitialScreen = () => {
    const {
        UserStore: { checkToken, authUser, logOut, fullName, token, isLoading },
    } = useStore()

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <UILayout isLoading={isLoading}>
            <UIView style={styles.container} mode="viewMain">
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
