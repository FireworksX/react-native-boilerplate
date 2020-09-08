import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native'
import UILayout from 'components/ui/UILayout'
import UIView from 'components/ui/UIView'
import UIText from 'components/ui/UIText'
import UITabbarControl, {
    TabbarControlIndex,
    TabbarControlItem,
} from 'components/ui/UITabbarControl'
import ThemeManager, { ThemeManagerContext } from 'components/ThemeManager'
import useTheme from 'hooks/useTheme'

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
    const [isLoading, setIsLoading] = useState(true)
    const [activeTheme, setActiveTheme] = useState<TabbarControlIndex>(0)
    const { setTheme } = useTheme()

    useEffect(() => {
        const value = activeTheme !== 0 ? 'dark' : 'light'
        setTheme(value)
    }, [activeTheme])

    const themes: TabbarControlItem[] = [
        {
            index: 0,
            name: 'Light',
        },
        {
            index: 1,
            name: 'Dark',
        },
    ]

    setTimeout(() => {
        setIsLoading(false)
    }, 2000)

    return (
        <UILayout isLoading={isLoading}>
            <UIView style={styles.container} mode="viewMain">
                <UIText style={styles.name} mode="textMain">
                    Initial
                </UIText>
                <View style={{ padding: 20, width: '100%' }}>
                    <UITabbarControl
                        items={themes}
                        activeIndex={activeTheme}
                        onChange={setActiveTheme}
                    />
                </View>
            </UIView>
        </UILayout>
    )
}

export default InitialScreen
