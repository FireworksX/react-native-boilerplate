import { Instance, types } from 'mobx-state-tree'

export const UserStore = types.model('UserStore', {})

export type UserStoreModel = Instance<typeof UserStore>
