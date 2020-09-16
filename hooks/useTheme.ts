import React from 'react'
import { ThemeManagerContext } from 'components/ThemeManager'
import { ColorSchemeName } from 'react-native'
import { CallbackValue } from 'types/types'

export default (): {
    theme: NonNullable<ColorSchemeName>
    setTheme: CallbackValue<NonNullable<ColorSchemeName>, void>
} => React.useContext(ThemeManagerContext)
