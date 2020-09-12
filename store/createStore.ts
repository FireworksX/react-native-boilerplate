import { RootStore, RootStoreEnv, RootStoreModel } from './RootStore'

const createStore = (): RootStoreModel => {
    const env: RootStoreEnv = {}

    return RootStore.create({}, env)
}

export default createStore
