import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import {
    View,
    StyleSheet,
    ViewStyle,
    Modal,
    ActivityIndicator,
} from 'react-native'
import useThemeColor from 'hooks/useThemeColor'

export interface ViewWithModalProps {
    style?: ViewStyle
    modal?: ReactElement
    isLoading?: boolean
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

const UILayout: FunctionComponent<ViewWithModalProps> = ({
    children,
    style,
    modal,
    isLoading,
}) => {
    const activeModal = modal?.props?.activeModal ?? undefined

    return (
        <View
            style={{
                ...styles.container,
                ...style,
                backgroundColor: useThemeColor('main'),
            }}
        >
            {children}
            {activeModal && <Modal transparent>{modal}</Modal>}
            {isLoading && (
                <Modal transparent>
                    <View style={styles.loaderLayout}>
                        <View style={styles.overlay} />
                        <View style={styles.loader}>
                            <ActivityIndicator size="large" color="#000" />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}

export default UILayout
