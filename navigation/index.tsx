import * as React from 'react'
import { useRef } from 'react'
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeName } from 'react-native'

import { RootStackParamList } from '../types'
import InitialScreen from '../screens/InitialScreen'
import AuthScreen from '../screens/AuthScreen'

export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName
}) {
    const navigationRef = useRef<any>()

    return (
        <NavigationContainer ref={navigationRef}>
            <RootNavigator />
        </NavigationContainer>
    )
}

const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="InitialScreen"
        >
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}
