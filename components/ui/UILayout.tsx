import React, { FunctionComponent, ReactElement, ReactNode } from 'react'
import {
    View,
    StyleSheet,
    ViewStyle,
    Modal,
    ActivityIndicator,
} from 'react-native'
import useThemeColor from 'hooks/useThemeColor'
import UIView from 'components/ui/UIView'

export interface ViewWithModalProps {
    style?: ViewStyle
    modal?: ReactElement
    isLoading?: boolean
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loaderLayout: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.6,
    },
    loader: {
        padding: 20,
        borderRadius: 8,
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
            }}
        >
            {children}
            {activeModal && <Modal transparent>{modal}</Modal>}
            {isLoading && (
                <Modal transparent>
                    <View style={styles.loaderLayout}>
                        <View
                            style={[
                                styles.overlay,
                                {
                                    backgroundColor: useThemeColor(
                                        'viewLoaderOverlay'
                                    ),
                                },
                            ]}
                        />
                        <UIView
                            mode="viewLoaderBackground"
                            style={styles.loader}
                        >
                            <ActivityIndicator
                                size="large"
                                color={useThemeColor('viewLoaderIndicator')}
                            />
                        </UIView>
                    </View>
                </Modal>
            )}
        </View>
    )
}

export default UILayout
