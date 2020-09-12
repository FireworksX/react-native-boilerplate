import { Instance, types } from 'mobx-state-tree'

export const RootStore = types
    .model('RootStore', {
        test: 'artur',
    })
    .actions((self) => ({
        set(val: string) {
            console.log(val);
            self.test = val
        },
    }))

export type RootStoreModel = Instance<typeof RootStore>

export interface RootStoreEnv {}
