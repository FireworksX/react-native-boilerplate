import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import UIView from 'components/ui/UIView'

export interface ModalPageHeaderProps {}

const styles = StyleSheet.create({
    header: {
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 60,
        height: 6,
        borderRadius: 4,
        marginBottom: 10,
    },
})

const UIModalPageHeader: FunctionComponent<ModalPageHeaderProps> = () => {
    return (
        <UIView mode="modalPageContent" style={styles.header}>
            <View style={styles.panelHeader}>
                <UIView
                    mode="modalHeaderHandler"
                    style={styles.panelHandle}
                />
            </View>
        </UIView>
    )
}

export default UIModalPageHeader
