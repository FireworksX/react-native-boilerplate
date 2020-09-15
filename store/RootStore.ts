import { Instance, types } from 'mobx-state-tree'
import { LocalStorageTypes } from '../types/LocalStorageTypes'
import { UserStore } from './UserStore'
import { IApiController } from '../types/ApiControllerTypes'

export const RootStore = types.model('RootStore', {
    UserStore,
})

export type RootStoreModel = Instance<typeof RootStore>

export interface RootStoreEnv {
    LocalStorage: LocalStorageTypes
    api: IApiController
}
