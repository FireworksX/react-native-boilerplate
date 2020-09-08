import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ThemeManager from 'components/ThemeManager'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    }
    return (
        <ThemeManager>
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        </ThemeManager>
    )
}
