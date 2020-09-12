import { StatusBar } from 'expo-status-bar'
import React, { useMemo, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ThemeManager from 'components/ThemeManager'

import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import StoreContext from './contexts/StoreContext'
import createStore from './store/createStore'

const RootStore = createStore()

export default function App() {
    const isLoadingComplete = useCachedResources()
    const colorScheme = useColorScheme()

    if (!isLoadingComplete) {
        return null
    }
    return (
        <StoreContext.Provider value={RootStore}>
            <ThemeManager>
                <SafeAreaProvider>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </SafeAreaProvider>
            </ThemeManager>
        </StoreContext.Provider>
    )
}
