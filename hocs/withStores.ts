import { inject, observer } from 'mobx-react'

const DEFAULT_STORES: string[] = [
    'rootStore',
    'routerStore',
    'userStore',
    'newsStore',
    'searchScreen',
    'activityScreen',
    'activitiesStore',
    'newsCurrentScreen',
    'eventsScreen',
    'profileScreen',
    'calendarScreen',
    'profileCities',
]

export default function (Component: any, stores?: string[]) {
    const proxyStores = stores ?? DEFAULT_STORES

    return inject(...proxyStores)(observer(Component))
}
