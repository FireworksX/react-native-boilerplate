# React Native Boilerplate

## Use technologies
- Expo
- Typescript
- EsLint (Airbnb) + Prettier
 
## State management
For control App state using **Mobx** + **Mobx State Tree**
``
    ./store/
``

## Import Aliases
- components = **./components**
- hocs = **./hocs**
- modals = **./modals**
- store = **./store**
- screens = **./screens**
- types = **./types**
- assets = **./assets**

You can extend this configuration
- Add alias in `` babel.config.js ``
- Add alias in `` tsconfig.json ``

#### Example
```js
import BaseSearch from 'components/BaseSearch'
import withStores from 'hocs/withStores'
```

## Libs
For gesture handlers using [react-native-gesture-handler][https://github.com/software-mansion/react-native-gesture-handler]

For animated using [react-native-reanimated][https://github.com/software-mansion/react-native-reanimated]
