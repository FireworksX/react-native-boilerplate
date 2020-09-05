import React, { useEffect, useState } from 'react'
import {Callback, CallbackValue} from '../types/types'
import Animated from 'react-native-reanimated'
import {
    View,
    Text,
    StyleSheet,
    LayoutRectangle,
    TouchableOpacity,
} from 'react-native'
import ThemeView from "./ThemeView";
import {useThemeColor} from "./Themed";
import ThemeText from "./ThemeText";

export type TabbarControlIndex = number

export interface TabbarControlLayout extends LayoutRectangle {
    index: number
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

const toggleOffset = new Animated.Value<number>(0)

const ANIMATE_CONFIG = {
    damping: 150,
    mass: .5,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
}

const TabbarControl = ({ activeIndex, items, onChange }: TabbarControlProps) => {
    const [layouts, setLayouts] = useState<TabbarControlLayout[]>([])

    useEffect(() => {
        const findLayout: TabbarControlLayout | undefined = layouts.find(({index}: TabbarControlLayout) => index === activeIndex)

        if (findLayout) {
            Animated.spring(toggleOffset, {
                toValue: findLayout.x,
                ...ANIMATE_CONFIG
            }).start()
        }
    }, [activeIndex])

    const renderItems = (items: TabbarControlItem[]) => {
        // onLayout может отработать перед тем как отренерятся компоненты и может нарушиться порядок добавления в массив
        const onGetLayout = (layout: LayoutRectangle, index: number) => {
            setLayouts([
                ...layouts,
                {
                    index,
                    ...layout,
                },
            ])
        }

        return items.map((item) =>
            getTabbarFragment(item, onGetLayout)
        )
    }

    const getTabbarFragment = (
        item: TabbarControlItem,
        onLayout: (layout: LayoutRectangle, index: number) => void,
    ) => (
        <TouchableOpacity
            style={styles.item}
            key={item.index}
            onLayout={({ nativeEvent: { layout } }) => onLayout(layout, item.index)}
            onPress={() => onChange(item.index)}
        >
            <ThemeText mode="typographyLight">{item.name}</ThemeText>
        </TouchableOpacity>
    )

    const toggleStyle = {
        backgroundColor: useThemeColor({}, 'tabbarFront'),
        borderColor: useThemeColor({}, 'tabbarBack'),
    }

    return (
        <ThemeView mode="tabbarBack" style={styles.underlay}>
            <Animated.View
                style={[
                    styles.toggle,
                    toggleStyle,
                    {
                        transform: [{ translateX: toggleOffset }],
                    },
                ]}
            />
            {renderItems(items)}
        </ThemeView>
    )
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

export default TabbarControl
