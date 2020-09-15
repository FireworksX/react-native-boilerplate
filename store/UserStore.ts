import { getEnv, Instance, types } from 'mobx-state-tree'
import LoadingModel from './models/LoadingModel'

export const UserStore = types.compose(
    LoadingModel,
    types
        .model('UserStore', {
            name: types.optional(types.string, ''),
            surName: types.optional(types.string, ''),
            token: types.maybe(types.string),
        })
        .views((self) => ({
            get fullName() {
                return `${self.name} ${self.surName}`
            },
        }))
        .actions((self: any) => ({
            async checkToken(): Promise<boolean> {
                if (self.token) return true
                const token = await getEnv(self).LocalStorage.getItem('token')
                self.setToken(token)
                return !!token
            },

            async authUser(login: string, password: string) {
                const {
                    isError,
                    data: { token, ...rest },
                } = await self.doFetch(
                    getEnv(self).api.authUser(login, password)
                )

                if (!isError) {
                    self.setUser(rest)
                    self.setToken(token)
                }
            },

            logOut() {
                self.setUser({})
                self.setToken()
            },

            setUser(userData: any) {
                self.name = userData.name
                self.surName = userData.surName
            },

            setToken(token?: string | null) {
                if (token && token !== null) {
                    self.token = token
                    getEnv(self).LocalStorage.setItem('token', token)
                } else {
                    self.token = undefined
                    getEnv(self).LocalStorage.removeItem('token')
                }
            },
        }))
)

export type UserStoreModel = Instance<typeof UserStore & typeof LoadingModel>
