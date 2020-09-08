# React Native Boilerplate

## Features
- Expo
- Typescript
- Configure EsLint (Airbnb) + Prettier
- **Automatically** generate component PropTypes from TypeScript interfaces
- Configure **path aliases**
- Configure API controller for fast start (axios)
- **Theming**: organize auto-detect theme device
- Create **base ui** components for very fast start
- Configure state management: Using **Mobx** + **Mobx State Tree**
- **Dependency Injection**
- **Full TypeScript coverage**
 
## State management
For control App state using **Mobx** + **Mobx State Tree**
``
    ./store/
``

## Themes
You can create multiply themes for you application.
Color schemes located ``` ./themes/ ```  directory
#### App automatic detect device color theme

Also you can control theme with ``` useTheme ``` hook
#### Example
```js
const { setTheme, theme } = useTheme()

setTheme('dark') // Possible 'dark' or 'light'
```

Or using **Context API**
```js
import { ThemeManagerContext } from 'components/ThemeManager'
```

#### All UI components already adaptive for multiple themes


## Import Aliases
- components = **./components**
- hocs = **./hocs**
- modals = **./modals**
- store = **./store**
- screens = **./screens**
- types = **./types**
- assets = **./assets**
- constants = **./constants**
- hooks = **./hooks**

You can extend this configuration
- Add alias in `` babel.config.js ``
- Add alias in `` tsconfig.json ``

#### Example
```js
import UISearch from 'components/UISearch'
import withStores from 'hocs/withStores'
```

## Libs
For gesture handlers using [react-native-gesture-handler][https://github.com/software-mansion/react-native-gesture-handler]

For animated using [react-native-reanimated][https://github.com/software-mansion/react-native-reanimated]
