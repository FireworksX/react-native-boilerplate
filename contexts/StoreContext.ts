import { createContext } from 'react'
import { RootStoreModel } from '../store/RootStore'

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel)

export default StoreContext
