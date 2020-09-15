import { RootStore, RootStoreEnv, RootStoreModel } from 'store/RootStore'
import LocalStorage from 'utils/LocalStorage'
import { UserStore } from 'store/UserStore'
import ApiController from '../utils/ApiController'

const createStore = (): RootStoreModel => {
    const UserStoreInstance = UserStore.create({})

    const env: RootStoreEnv = {
        LocalStorage: new LocalStorage(),
        api: new ApiController(),
    }

    return RootStore.create(
        {
            UserStore: UserStoreInstance,
        },
        env
    )
}

export default createStore
