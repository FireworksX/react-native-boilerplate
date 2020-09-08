import { light as UIText } from './UIText'
import { light as UITabbar } from './UITabbarControl'
import { light as UIView } from './UIView'

export default {
    transparent: 'transparent',
    ...UITabbar,
    ...UIView,
    ...UIText,
}
