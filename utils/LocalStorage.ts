import AsyncStorage from '@react-native-community/async-storage'
import App from 'constants/App'
import { LocalStorageTypes } from '../types/LocalStorageTypes'

const SAVE_HASH = `@${App.APP_NAME}:`

export default class LocalStorage implements LocalStorageTypes {
    private storage: typeof AsyncStorage = AsyncStorage

    constructor(storage?: typeof AsyncStorage) {
        if (storage) {
            this.storage = storage
        }
    }

    setItem(key: string, value: string) {
        return this.storage.setItem(`${SAVE_HASH}${key}`, value)
    }

    getItem(key: string): Promise<any> {
        return this.storage.getItem(`${SAVE_HASH}${key}`)
    }

    removeItem(key: string): Promise<any> {
        return this.storage.removeItem(`${SAVE_HASH}${key}`)
    }
}
