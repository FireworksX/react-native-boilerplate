import React, { useEffect, useState } from 'react'
import {
    Text,
    StyleSheet,
    ActivityIndicator,
    View,
    ColorSchemeName,
} from 'react-native'
import UILayout from 'components/ui/UILayout'
import UIView from 'components/ui/UIView'
import UIText from 'components/ui/UIText'
import UITabbarControl, {
    TabbarControlIndex,
    TabbarControlItem,
} from 'components/ui/UITabbarControl'
import useTheme from 'hooks/useTheme'
import useColorScheme from '../hooks/useColorScheme'

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
    const [activeTheme, setActiveTheme] = useState<'dark' | 'light' | 'auto'>(
        'light'
    )
    const { setTheme } = useTheme()
    const deviceTheme = useColorScheme()

    useEffect(() => {
        const realMode = activeTheme === 'auto' ? deviceTheme : activeTheme
        setTheme(realMode)
    }, [activeTheme])

    const themes: TabbarControlItem[] = [
        {
            index: 'light',
            name: 'Light',
        },
        {
            index: 'auto',
            name: 'Auto',
        },
        {
            index: 'dark',
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
