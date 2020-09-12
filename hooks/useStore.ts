import { useContext } from 'react'
import StoreContext from '../contexts/StoreContext'

const useStore = () => useContext(StoreContext)

export default useStore
