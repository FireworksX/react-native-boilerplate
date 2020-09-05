export enum RootStacks {
    Root,
    NotFound,
    Auth,
}

export type RootStackParamList = {
    InitialScreen: undefined
    Root: undefined
    NotFound: undefined
    AuthLogin: undefined
    AuthRegister: undefined
    AuthSelectRole: undefined
    AuthFinish: undefined
    AuthRecovery: undefined
}

export type BottomTabParamList = {
    Home: undefined
    Search: undefined
    Calendar: undefined
    Events: undefined
    Profile: undefined
    ActivitiesListScreen: undefined
}

export type TabHomeParamList = {
    HomeScreen: undefined
    RecommendActivitiesListScreen: undefined
    PopularActivitiesListScreen: undefined
    ActivityScreen: undefined
    NewsListScreen: undefined
    NewsScreen: undefined
}

export type TabSearchParamList = {
    SearchScreen: undefined
}

export type TabCalendarParamList = {
    CalendarScreen: undefined
}

export type TabEventsParamList = {
    EventsScreen: undefined
}

export type TabProfileParamList = {
    ProfileScreen: undefined
    ProfileSetting: undefined
    ProfileEdit: undefined
    ProfileAppSettings: undefined
}
