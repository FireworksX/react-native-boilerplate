import { light as UIText } from './UIText'
import { light as UITabbar } from './UITabbarControl'
import { light as UIView } from './UIView'
import { light as UIButton } from './UIButton'

export default {
    transparent: 'transparent',
    ...UITabbar,
    ...UIView,
    ...UIText,
    ...UIButton,
}
