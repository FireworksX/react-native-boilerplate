import React, {
    Children,
    Component,
    ComponentType,
    ReactNode,
    useEffect,
    useState,
} from 'react'
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { ModalPageId, ModalPageLayout } from './ModalPage'
import BaseButton from '../components/BaseButton'

export type ModalRootActiveModal = ModalPageId | undefined

export interface ModalRootProps {
    activeModal: ModalRootActiveModal
    children: ReactNode
    onClose?: () => void
}

let fall = new Animated.Value(1)
let activeModalRef: any
let activeModalForceUpdateCb: Function

export default function ({ children, activeModal, onClose }: ModalRootProps) {
    const [stateActiveChildren, setStateActiveChildren] = useState<
        ReactNode | undefined
    >()

    const getActiveModal = (
        activeModal: string | undefined,
        onGetRef: (ref: any) => void,
        onReadyLayout: (layouts: ModalPageLayout) => void
    ) => {
        const ActiveChildren: any = Children.toArray(children).find(
            ({ props }: any) => props.id === activeModal
        )
        if (ActiveChildren) {
            return React.cloneElement(ActiveChildren, {
                key: ActiveChildren.id,
                callbackNode: fall,
                getRef: (ref: any) => {
                    onGetRef(ref)
                },
                onClose: doCloseActiveModal,
                onReadyLayout,
            })
        }
        return undefined
    }

    useEffect(() => {
        const activeChildren = getActiveModal(
            activeModal,
            (ref) => {
                activeModalRef = ref
            },
            () => {
                openActiveModal()
            }
        )

        if (activeModal !== undefined) {
            if (stateActiveChildren !== undefined) {
                closeActiveModal()
                setStateActiveChildren(activeChildren)
            } else {
                setStateActiveChildren(activeChildren)
            }
        } else {
            closeActiveModal()
        }
    }, [activeModal])

    const openActiveModal = () => {
        if (activeModalRef && activeModalRef.current) {
            activeModalRef.current.snapTo(0)
        }
    }

    const doCloseActiveModal = () => {
        if (onClose) {
            setStateActiveChildren(undefined)
            onClose()
        }
    }

    const closeActiveModal = () => {
        if (activeModalRef && activeModalRef.current) {
            activeModalRef.current.snapTo(1)
        }
    }

    const renderOverlay = () => {
        const animatedShadowOpacity = Animated.interpolate(fall, {
            inputRange: [0, 1],
            outputRange: [0.6, 0],
        })

        return (
            <TouchableOpacity
                style={{ ...StyleSheet.absoluteFillObject }}
                activeOpacity={1}
                onPress={closeActiveModal}
            >
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.overlay,
                        {
                            opacity: animatedShadowOpacity,
                        },
                    ]}
                />
            </TouchableOpacity>
        )
    }

    return (
        <>
            {stateActiveChildren}
            {stateActiveChildren && renderOverlay()}
        </>
    )
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        zIndex: 9999,
    },
})
