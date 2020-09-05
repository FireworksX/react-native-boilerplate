import React, { ReactNode } from 'react'
import {
    View,
    StyleSheet,
    ViewStyle,
    Modal,
    ActivityIndicator,
} from 'react-native'
import { useThemeColor } from './Themed'

export interface ViewWithModalProps {
    style?: ViewStyle
    children: ReactNode
    modal?: ReactNode
    loading?: boolean
}

const BaseView = ({ children, style, modal, loading }: ViewWithModalProps) => {
    // @ts-ignore
    const activeModal = modal?.props?.activeModal ?? undefined

    return (
        <View
            style={{
                ...styles.container,
                ...style,
                backgroundColor: useThemeColor({}, 'backgroundLight'),
            }}
        >
            {children}
            {activeModal && <Modal transparent={true}>{modal}</Modal>}
            {loading && (
                <Modal transparent={true}>
                    <View style={styles.loaderLayout}>
                        <View style={styles.overlay}></View>
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loaderLayout: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        opacity: 0.6,
    },
    loader: {
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default BaseView
