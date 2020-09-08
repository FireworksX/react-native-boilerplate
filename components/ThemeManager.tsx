import React, { useState } from 'react'
import useColorScheme from 'hooks/useColorScheme'
import { ColorSchemeName } from 'react-native'

export const ThemeManagerContext: React.Context<any> = React.createContext(
    undefined
)

const ThemeManager = ({ children }: any) => {
    const [theme, setTheme] = useState<ColorSchemeName>(useColorScheme())

    return (
        <ThemeManagerContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeManagerContext.Provider>
    )
}

export default ThemeManager
