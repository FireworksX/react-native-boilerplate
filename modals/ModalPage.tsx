import React, {
    FunctionComponent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react'
import BottomSheet from 'reanimated-bottom-sheet'
import { View, StyleSheet, LayoutRectangle } from 'react-native'
import Animated from 'react-native-reanimated'
import ThemeView from 'components/ThemeView'
import Layout from 'constants/Layout'

export type ModalPagePoint = string | number
export type ModalPagePoints = [ModalPagePoint, ModalPagePoint]
export type ModalPageId = string

export interface ModalPageLayout {
    content: LayoutRectangle
    header?: LayoutRectangle
}

export interface ModalPageProps {
    id: ModalPageId
    children: ReactNode
    header?: ReactNode
    points?: ModalPagePoints
    initialPointIndex?: number
    getRef?: (ref: any) => void
    getForceUpdate?: (cb: Function) => void
    onClose?: () => void
    onReadyLayout?: (layout: ModalPageLayout) => void
    callbackNode?: Animated.Value<number>
    autoHeight?: boolean
    visible?: boolean
}

const WINDOW_HEIGHT = Layout.window.height
const SAFE_HEIGHT = WINDOW_HEIGHT - 100

const ModalPage: FunctionComponent<ModalPageProps> = ({
    children,
    header,
    points,
    initialPointIndex,
    getRef,
    callbackNode,
    autoHeight,
    onClose,
    onReadyLayout,
}: ModalPageProps) => {
    const ref = useRef<any>()
    const [panelLayout, setPanelLayout] = useState<LayoutRectangle | undefined>(
        undefined
    )
    const [headerLayout, setHeaderLayout] = useState<
        LayoutRectangle | undefined
    >(undefined)
    const [statePoints, setStatePoints] = useState<any>(points)
    let calcTotalHeight = 0

    const renderPanelContent = () => (
        <ThemeView
            mode="modalPageContent"
            onLayout={({ nativeEvent: { layout } }) => {
                setPanelLayout(layout)
            }}
        >
            {children}
        </ThemeView>
    )

    const renderPanelHeader = () => (
        <View
            onLayout={({ nativeEvent: { layout } }) => {
                setHeaderLayout(layout)
            }}
        >
            {header}
        </View>
    )

    useEffect(() => {
        if (getRef) {
            getRef(ref)
        }
    }, [ref])

    useEffect(() => {
        if (panelLayout) {
            calcTotalHeight += panelLayout.height
        }
        if (headerLayout) {
            calcTotalHeight += headerLayout.height
        }

        if (calcTotalHeight > SAFE_HEIGHT) {
            calcTotalHeight = SAFE_HEIGHT
        }
    }, [panelLayout, headerLayout])

    useEffect(() => {
        if (panelLayout && onReadyLayout) {
            if (autoHeight) {
                setStatePoints([calcTotalHeight, 0])
            }
            if (header && headerLayout) {
                onReadyLayout({
                    content: panelLayout,
                })
            }
        }
    }, [panelLayout, headerLayout])

    return (
        <BottomSheet
            snapPoints={statePoints ?? []}
            renderContent={renderPanelContent}
            renderHeader={renderPanelHeader}
            initialSnap={initialPointIndex}
            enabledInnerScrolling={false}
            ref={ref}
            onCloseEnd={onClose}
            callbackNode={callbackNode}
        />
    )
}

ModalPage.defaultProps = {
    points: ['75%', 0],
    initialPointIndex: 1,
    autoHeight: true,
}

export default ModalPage
