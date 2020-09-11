import React, { useEffect, useState } from 'react'
import Animated from 'react-native-reanimated'
import {
    StyleSheet,
    LayoutRectangle,
    TouchableOpacity,
    View,
} from 'react-native'
import { CallbackValue } from 'types/types'
import UIText from 'components/ui/UIText'
import UIView from 'components/ui/UIView'
import useThemeColor from 'hooks/useThemeColor'
import {
    panGestureHandler,
    useDebug,
    usePanGestureHandler,
    withSpring,
} from 'react-native-redash'
import { PanGestureHandler } from 'react-native-gesture-handler'

export type TabbarControlIndex<T = any> = T | string | number

export interface TabbarControlLayout {
    index: TabbarControlIndex
    width: number
    x: number
}

export interface TabbarControlItem {
    index: TabbarControlIndex
    name: string
}

export interface TabbarControlProps {
    items: TabbarControlItem[]
    activeIndex: TabbarControlIndex
    onChange: CallbackValue<TabbarControlIndex, void>
}

export interface TAbbarAnimateValues {
    x: number
    width: number
}

export interface TabbarLayoutIndex {
    layout: LayoutRectangle
    index: TabbarControlIndex
}

const toggleOffset = new Animated.Value<number>(0)
const toggleWidth = new Animated.Value<number>(0)

const ANIMATE_CONFIG = {
    damping: 150,
    mass: 0.5,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
}

const styles = StyleSheet.create({
    underlay: {
        flexDirection: 'row',
        borderRadius: 16,
    },
    item: {
        height: 40,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemText: {
        fontSize: 14,
    },
    toggle: {
        position: 'absolute',
        height: 40,
        width: 195,
        borderWidth: 2,
        borderColor: '#F5F5F5',
        backgroundColor: '#fff',
        borderRadius: 16,
        left: 0,
        top: 0,
    },
})

const UITabbarControl = ({
    activeIndex,
    items,
    onChange,
}: TabbarControlProps) => {
    const [layouts, setLayouts] = useState<TabbarControlLayout[]>([])
    const {
        gestureHandler,
        velocity,
        translation,
        state,
    } = usePanGestureHandler()
    const translateXValue = withSpring({
        state,
        velocity: velocity.x,
        value: translation.x,
        config: ANIMATE_CONFIG,
        snapPoints: [0, 100, 200],
    })

    const getTabbarFragment = (
        item: TabbarControlItem,
        onLayout: CallbackValue<TabbarLayoutIndex, void>
    ) => (
        <View
            style={styles.item}
            key={item.index}
            pointerEvents={item.index === activeIndex ? 'none' : 'auto'}
            onLayout={({ nativeEvent: { layout } }) =>
                onLayout({ layout, index: item.index })
            }
        >
            <TouchableOpacity onPress={() => onChange(item.index)}>
                <UIText mode="TabbarText">{item.name}</UIText>
            </TouchableOpacity>
        </View>
    )

    const renderItems = (items: TabbarControlItem[]) => {
        const onGetLayout = (layoutIndex: TabbarLayoutIndex) => {
            setLayouts([
                ...layouts,
                {
                    index: layoutIndex.index,
                    width: layoutIndex.layout.width,
                    x: layoutIndex.layout.x,
                },
            ])
        }

        return items.map((el) => getTabbarFragment(el, onGetLayout))
    }

    const setAnimateValues = ({ x, width }: TAbbarAnimateValues) => {
        Animated.spring(toggleOffset, {
            toValue: x,
            ...ANIMATE_CONFIG,
        }).start()
        Animated.spring(toggleWidth, {
            toValue: width,
            ...ANIMATE_CONFIG,
        }).start()
    }

    useEffect(() => {
        const findLayout: TabbarControlLayout | undefined = layouts.find(
            ({ index }: TabbarControlLayout) => index === activeIndex
        )

        if (findLayout) {
            setAnimateValues({
                x: findLayout?.x ?? 0,
                width: findLayout?.width ?? 0,
            })
        }
    }, [activeIndex])

    const toggleStyle = {
        backgroundColor: useThemeColor('TabbarFront'),
        borderColor: useThemeColor('TabbarBack'),
    }

    return (
        <UIView mode="TabbarBack" style={styles.underlay}>
            <PanGestureHandler {...gestureHandler}>
                <Animated.View
                    style={[
                        styles.toggle,
                        toggleStyle,
                        {
                            transform: [{ translateX: toggleOffset }],
                            width: toggleWidth,
                        },
                    ]}
                />
            </PanGestureHandler>
            {renderItems(items)}
        </UIView>
    )
}

export default UITabbarControl
